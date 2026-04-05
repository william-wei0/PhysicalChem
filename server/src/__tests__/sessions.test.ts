import { describe, it, expect, vi, beforeEach } from "vitest";
import { loginUser, rotateRefreshToken, logoutUser, requestPasswordReset, resetPassword } from "../auth/authService";
import { withAdminContext } from "../lib/prisma";
import * as userService from "../users/userService";
import * as email from "../utils/email";
import bcrypt from "bcrypt";

const mockTxClient = {
  users: {
    update: vi.fn(),
  },
  loginSession: {
    deleteMany: vi.fn(),
  },
};

const mockClient = {
  users: {
    findUnique: vi.fn(),
    findFirst: vi.fn(),
    update: vi.fn(),
  },
  loginSession: {
    create: vi.fn(),
    findUnique: vi.fn(),
    update: vi.fn(),
    delete: vi.fn(),
    deleteMany: vi.fn(),
  },
  $transaction: vi.fn((fn) => fn(mockTxClient)),
};

vi.mock("../lib/prisma", () => ({
  withAdminContext: vi.fn((fn) => fn(mockClient)),
}));

vi.mock("../users/userService", () => ({
  getUserByEmail: vi.fn(),
}));

vi.mock("../utils/tokens", () => ({
  generateAccessToken: vi.fn(() => "mock-access-token"),
  generateRefreshToken: vi.fn(() => "mock-refresh-token"),
}));

vi.mock("../utils/email", () => ({
  sendPasswordResetEmail: vi.fn(),
}));

vi.mock("crypto", () => ({
  default: {
    randomBytes: vi.fn(() => ({ toString: () => "mock-reset-token" })),
  },
}));

const mockUser = {
  id: 1,
  username: "testuser",
  email: "test@example.com",
  passwordHash: await bcrypt.hash("Password123!", 10),
  resetPasswordToken: null,
  resetPasswordExpires: null,
  createdAt: new Date(),
  lessonProgresses: [],
  userRoles: [],
  userGroups: [],
  loginSessions: [],
};

const mockSession = {
  id: 1,
  userId: 1,
  refreshToken: "mock-refresh-token",
  expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
  createdAt: new Date(),
};

beforeEach(() => {
  vi.clearAllMocks();
  mockClient.$transaction.mockImplementation((fn) => fn(mockTxClient));
    mockTxClient.users.update.mockReset();
  mockTxClient.loginSession.deleteMany.mockReset();
});

// ---------------------------------------------------------------------------
// loginUser
// ---------------------------------------------------------------------------

describe("loginUser", () => {
  it("returns tokens and user on valid credentials", async () => {
    vi.mocked(userService.getUserByEmail).mockResolvedValue(mockUser);
    mockClient.loginSession.create.mockResolvedValue(mockSession);

    const result = await loginUser("test@example.com", "Password123!");

    expect(result).toMatchObject({
      accessToken: "mock-access-token",
      refreshToken: "mock-refresh-token",
      user: { id: 1, username: "testuser", email: "test@example.com" },
    });
  });

  it("creates a loginSession with correct data on success", async () => {
    vi.mocked(userService.getUserByEmail).mockResolvedValue(mockUser);
    mockClient.loginSession.create.mockResolvedValue(mockSession);

    await loginUser("test@example.com", "Password123!");

    expect(mockClient.loginSession.create).toHaveBeenCalledOnce();
    expect(mockClient.loginSession.create).toHaveBeenCalledWith({
      data: {
        userId: mockUser.id,
        refreshToken: "mock-refresh-token",
        expiresAt: expect.any(Date),
      },
    });
  });

  it("sets session expiry 7 days from now", async () => {
    vi.mocked(userService.getUserByEmail).mockResolvedValue(mockUser);
    mockClient.loginSession.create.mockResolvedValue(mockSession);

    const before = Date.now();
    await loginUser("test@example.com", "Password123!");
    const after = Date.now();

    const expiresAt = mockClient.loginSession.create.mock.calls[0][0].data.expiresAt as Date;
    const sevenDays = 7 * 24 * 60 * 60 * 1000;
    expect(expiresAt.getTime()).toBeGreaterThanOrEqual(before + sevenDays - 100);
    expect(expiresAt.getTime()).toBeLessThanOrEqual(after + sevenDays + 100);
  });

  it("throws on wrong password and does not create session", async () => {
    vi.mocked(userService.getUserByEmail).mockResolvedValue(mockUser);

    await expect(loginUser("test@example.com", "wrongpassword")).rejects.toThrow("Invalid email or password.");
    expect(mockClient.loginSession.create).not.toHaveBeenCalled();
  });

  it("throws if user does not exist and does not create session", async () => {
    vi.mocked(userService.getUserByEmail).mockResolvedValue(null);

    await expect(loginUser("ghost@example.com", "Password123!")).rejects.toThrow("Invalid email or password.");
    expect(mockClient.loginSession.create).not.toHaveBeenCalled();
  });

  it("throws 401 on invalid credentials", async () => {
    vi.mocked(userService.getUserByEmail).mockResolvedValue(null);

    await expect(loginUser("ghost@example.com", "Password123!")).rejects.toMatchObject({ statusCode: 401 });
  });

  it("wraps loginSession.create in admin context", async () => {
    vi.mocked(userService.getUserByEmail).mockResolvedValue(mockUser);
    mockClient.loginSession.create.mockResolvedValue(mockSession);

    await loginUser("test@example.com", "Password123!");

    expect(withAdminContext).toHaveBeenCalledOnce();
  });
});

// ---------------------------------------------------------------------------
// rotateRefreshToken
// ---------------------------------------------------------------------------

describe("rotateRefreshToken", () => {
  it("returns new tokens on valid unexpired session", async () => {
    mockClient.loginSession.findUnique.mockResolvedValue(mockSession);
    mockClient.loginSession.update.mockResolvedValue(mockSession);

    const result = await rotateRefreshToken("mock-refresh-token");

    expect(result).toMatchObject({
      accessToken: "mock-access-token",
      refreshToken: "mock-refresh-token",
    });
  });

  it("updates session with new token and expiry", async () => {
    mockClient.loginSession.findUnique.mockResolvedValue(mockSession);
    mockClient.loginSession.update.mockResolvedValue(mockSession);

    await rotateRefreshToken("mock-refresh-token");

    expect(mockClient.loginSession.update).toHaveBeenCalledWith({
      where: { id: mockSession.id },
      data: {
        refreshToken: "mock-refresh-token",
        expiresAt: expect.any(Date),
      },
    });
  });

  it("throws if session does not exist", async () => {
    mockClient.loginSession.findUnique.mockResolvedValue(null);

    await expect(rotateRefreshToken("nonexistent-token")).rejects.toThrow("Invalid or expired refresh token.");
    expect(mockClient.loginSession.update).not.toHaveBeenCalled();
  });

  it("throws and deletes session if token is expired", async () => {
    const expiredSession = { ...mockSession, expiresAt: new Date(Date.now() - 1000) };
    mockClient.loginSession.findUnique.mockResolvedValue(expiredSession);
    mockClient.loginSession.delete.mockResolvedValue(expiredSession);

    await expect(rotateRefreshToken("mock-refresh-token")).rejects.toThrow("Invalid or expired refresh token.");

    expect(mockClient.loginSession.delete).toHaveBeenCalledWith({ where: { id: expiredSession.id } });
    expect(mockClient.loginSession.update).not.toHaveBeenCalled();
  });

  it("throws 401 on expired session", async () => {
    const expiredSession = { ...mockSession, expiresAt: new Date(Date.now() - 1000) };
    mockClient.loginSession.findUnique.mockResolvedValue(expiredSession);
    mockClient.loginSession.delete.mockResolvedValue(expiredSession);

    await expect(rotateRefreshToken("mock-refresh-token")).rejects.toMatchObject({ statusCode: 401 });
  });

  it("wraps session lookup and update in admin context", async () => {
    mockClient.loginSession.findUnique.mockResolvedValue(mockSession);
    mockClient.loginSession.update.mockResolvedValue(mockSession);

    await rotateRefreshToken("mock-refresh-token");

    expect(withAdminContext).toHaveBeenCalledOnce();
  });
});

// ---------------------------------------------------------------------------
// logoutUser
// ---------------------------------------------------------------------------

describe("logoutUser", () => {
  it("deletes the session matching the refresh token", async () => {
    mockClient.loginSession.deleteMany.mockResolvedValue({ count: 1 });

    await logoutUser("mock-refresh-token");

    expect(mockClient.loginSession.deleteMany).toHaveBeenCalledWith({
      where: { refreshToken: "mock-refresh-token" },
    });
  });

  it("does not throw if session does not exist (idempotent)", async () => {
    mockClient.loginSession.deleteMany.mockResolvedValue({ count: 0 });

    await expect(logoutUser("stale-token")).resolves.not.toThrow();
  });

  it("wraps loginSession.deleteMany in admin context", async () => {
    mockClient.loginSession.deleteMany.mockResolvedValue({ count: 1 });

    await logoutUser("mock-refresh-token");

    expect(withAdminContext).toHaveBeenCalledOnce();
  });
});

// ---------------------------------------------------------------------------
// requestPasswordReset
// ---------------------------------------------------------------------------

describe("requestPasswordReset", () => {
  it("updates user with reset token and expiry", async () => {
    mockClient.users.findUnique.mockResolvedValue(mockUser);
    mockClient.users.update.mockResolvedValue(mockUser);

    await requestPasswordReset("test@example.com");

    expect(mockClient.users.update).toHaveBeenCalledWith({
      where: { email: "test@example.com" },
      data: {
        resetPasswordToken: "mock-reset-token",
        resetPasswordExpires: expect.any(Date),
      },
    });
  });

  it("sets token expiry 15 minutes from now", async () => {
    mockClient.users.findUnique.mockResolvedValue(mockUser);
    mockClient.users.update.mockResolvedValue(mockUser);

    const before = Date.now();
    await requestPasswordReset("test@example.com");
    const after = Date.now();

    const resetPasswordExpires = mockClient.users.update.mock.calls[0][0].data.resetPasswordExpires as Date;
    const fifteenMin = 15 * 60 * 1000;
    expect(resetPasswordExpires.getTime()).toBeGreaterThanOrEqual(before + fifteenMin - 100);
    expect(resetPasswordExpires.getTime()).toBeLessThanOrEqual(after + fifteenMin + 100);
  });

  it("sends a password reset email with the token", async () => {
    mockClient.users.findUnique.mockResolvedValue(mockUser);
    mockClient.users.update.mockResolvedValue(mockUser);

    await requestPasswordReset("test@example.com");

    expect(email.sendPasswordResetEmail).toHaveBeenCalledWith("test@example.com", "mock-reset-token");
  });

  it("returns without sending email if user does not exist", async () => {
    mockClient.users.findUnique.mockResolvedValue(null);

    await expect(requestPasswordReset("ghost@example.com")).resolves.not.toThrow();
    expect(mockClient.users.update).not.toHaveBeenCalled();
    expect(email.sendPasswordResetEmail).not.toHaveBeenCalled();
  });

  it("wraps users.findUnique and users.update in admin context", async () => {
    mockClient.users.findUnique.mockResolvedValue(mockUser);
    mockClient.users.update.mockResolvedValue(mockUser);

    await requestPasswordReset("test@example.com");

    expect(withAdminContext).toHaveBeenCalledOnce();
  });
});

// ---------------------------------------------------------------------------
// resetPassword
// ---------------------------------------------------------------------------

describe("resetPassword", () => {
  const validUserWithToken = {
    ...mockUser,
    resetPasswordToken: "valid-token",
    resetPasswordExpires: new Date(Date.now() + 10 * 60 * 1000),
  };

  it("runs update and session wipe atomically in a transaction", async () => {
    mockClient.users.findFirst.mockResolvedValue(validUserWithToken);

    await resetPassword("valid-token", "NewPassword123!");

    expect(mockClient.$transaction).toHaveBeenCalledOnce();
    expect(mockClient.$transaction).toHaveBeenCalledWith(expect.any(Function));
  });

  it("clears resetPasswordToken and resetPasswordExpires on success", async () => {
    mockClient.users.findFirst.mockResolvedValue(validUserWithToken);

    await resetPassword("valid-token", "NewPassword123!");

    expect(mockTxClient.users.update).toHaveBeenCalledWith(
      expect.objectContaining({
        data: expect.objectContaining({
          resetPasswordToken: null,
          resetPasswordExpires: null,
        }),
      }),
    );
  });

  it("hashes the new password before storing", async () => {
    mockClient.users.findFirst.mockResolvedValue(validUserWithToken);

    await resetPassword("valid-token", "NewPassword123!");

    const storedHash = mockTxClient.users.update.mock.calls[0][0].data.passwordHash as string;
    expect(storedHash).toBeDefined();
    expect(storedHash).not.toBe("NewPassword123!");
    await expect(bcrypt.compare("NewPassword123!", storedHash)).resolves.toBe(true);
  });

  it("wipes all loginSessions for the user", async () => {
    mockClient.users.findFirst.mockResolvedValue(validUserWithToken);

    await resetPassword("valid-token", "NewPassword123!");

    expect(mockTxClient.loginSession.deleteMany).toHaveBeenCalledWith({
      where: { userId: mockUser.id },
    });
  });

  it("throws on invalid token", async () => {
    mockClient.users.findFirst.mockResolvedValue(null);

    await expect(resetPassword("bad-token", "NewPassword123!")).rejects.toThrow("Invalid or expired reset token.");
    expect(mockClient.$transaction).not.toHaveBeenCalled();
  });

  it("throws on expired token (findFirst returns null via query filter)", async () => {
    mockClient.users.findFirst.mockResolvedValue(null);

    await expect(resetPassword("expired-token", "NewPassword123!")).rejects.toThrow("Invalid or expired reset token.");
    expect(mockClient.$transaction).not.toHaveBeenCalled();
  });

  it("throws 400 on invalid token", async () => {
    mockClient.users.findFirst.mockResolvedValue(null);

    await expect(resetPassword("bad-token", "NewPassword123!")).rejects.toMatchObject({ statusCode: 400 });
  });

  it("does not wipe sessions if transaction fails", async () => {
    mockClient.users.findFirst.mockResolvedValue(validUserWithToken);
    mockClient.$transaction.mockRejectedValue(new Error("DB error"));

    await expect(resetPassword("valid-token", "NewPassword123!")).rejects.toThrow("DB error");
    expect(mockTxClient.loginSession.deleteMany).not.toHaveBeenCalled();
  });

  it("wraps users.findFirst and transaction in admin context", async () => {
    mockClient.users.findFirst.mockResolvedValue(validUserWithToken);

    await resetPassword("valid-token", "NewPassword123!");

    expect(withAdminContext).toHaveBeenCalledOnce();
  });
});