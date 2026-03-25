import { describe, it, expect, vi, beforeEach } from "vitest";
import { loginUser, rotateRefreshToken, logoutUser } from "..//auth/authService";
import { resetPassword } from "../auth/authService";
import { prisma } from "../lib/prisma";
import bcrypt from "bcrypt";

vi.mock("../lib/prisma", () => ({
  prisma: {
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
    $transaction: vi.fn(),
  },
}));

vi.mock("../utils/tokens", () => ({
  generateAccessToken: vi.fn(() => "mock-access-token"),
  generateRefreshToken: vi.fn(() => "mock-refresh-token"),
  verifyRefreshToken: vi.fn(),
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

const mockLoginSession = {
  id: 1,
  userId: 1,
  refreshToken: "mock-refresh-token",
  expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
  createdAt: new Date(),
};

beforeEach(() => {
  vi.clearAllMocks();
});

describe("loginUser", () => {
  it("creates a loginSession on successful login", async () => {
    vi.mocked(prisma.users.findUnique).mockResolvedValue(mockUser);
    vi.mocked(prisma.loginSession.create).mockResolvedValue(mockLoginSession);

    await loginUser("test@example.com", "Password123!");

    expect(prisma.loginSession.create).toHaveBeenCalledOnce();
    expect(prisma.loginSession.create).toHaveBeenCalledWith({
      data: {
        userId: mockUser.id,
        refreshToken: "mock-refresh-token",
        expiresAt: expect.any(Date),
      },
    });
  });

  it("returns accessToken, refreshToken and user", async () => {
    vi.mocked(prisma.users.findUnique).mockResolvedValue(mockUser);
    vi.mocked(prisma.loginSession.create).mockResolvedValue(mockLoginSession);

    const result = await loginUser("test@example.com", "Password123!");

    expect(result).toMatchObject({
      accessToken: "mock-access-token",
      refreshToken: "mock-refresh-token",
      user: expect.objectContaining({ id: 1 }),
    });
  });

  it("does not create a loginSession on invalid password", async () => {
    vi.mocked(prisma.users.findUnique).mockResolvedValue(mockUser);

    await expect(loginUser("test@example.com", "wrongpassword")).rejects.toThrow("Invalid email or password.");
    expect(prisma.loginSession.create).not.toHaveBeenCalled();
  });

  it("does not create a loginSession if user does not exist", async () => {
    vi.mocked(prisma.users.findUnique).mockResolvedValue(null);

    await expect(loginUser("ghost@example.com", "Password123!")).rejects.toThrow("Invalid email or password.");
    expect(prisma.loginSession.create).not.toHaveBeenCalled();
  });
});

describe("rotateRefreshToken", () => {
  it("issues new tokens and updates loginSession", async () => {
    vi.mocked(prisma.loginSession.findUnique).mockResolvedValue(mockLoginSession);
    vi.mocked(prisma.loginSession.update).mockResolvedValue({
      ...mockLoginSession,
      refreshToken: "new-refresh-token",
    });

    const result = await rotateRefreshToken("mock-refresh-token");

    expect(prisma.loginSession.update).toHaveBeenCalledWith({
      where: { id: mockLoginSession.id },
      data: {
        refreshToken: "mock-refresh-token", // from generateRefreshToken mock
        expiresAt: expect.any(Date),
      },
    });
    expect(result).toMatchObject({
      accessToken: "mock-access-token",
      refreshToken: "mock-refresh-token",
    });
  });

  it("throws if loginSession does not exist", async () => {
    vi.mocked(prisma.loginSession.findUnique).mockResolvedValue(null);

    await expect(rotateRefreshToken("nonexistent-token")).rejects.toThrow("Invalid or expired refresh token.");
    expect(prisma.loginSession.update).not.toHaveBeenCalled();
  });

  it("throws and deletes loginSession if token is expired", async () => {
    const expiredloginSession = {
      ...mockLoginSession,
      expiresAt: new Date(Date.now() - 1000), // in the past
    };
    vi.mocked(prisma.loginSession.findUnique).mockResolvedValue(expiredloginSession);
    vi.mocked(prisma.loginSession.delete).mockResolvedValue(expiredloginSession);

    await expect(rotateRefreshToken("mock-refresh-token")).rejects.toThrow("Invalid or expired refresh token.");
    expect(prisma.loginSession.delete).toHaveBeenCalledWith({
      where: { id: expiredloginSession.id },
    });
    expect(prisma.loginSession.update).not.toHaveBeenCalled();
  });

  it("does not update loginSession if token is expired", async () => {
    const expiredloginSession = { ...mockLoginSession, expiresAt: new Date(Date.now() - 1000) };
    vi.mocked(prisma.loginSession.findUnique).mockResolvedValue(expiredloginSession);
    vi.mocked(prisma.loginSession.delete).mockResolvedValue(expiredloginSession);

    await expect(rotateRefreshToken("mock-refresh-token")).rejects.toThrow();
    expect(prisma.loginSession.update).not.toHaveBeenCalled();
  });
});

describe("logoutUser", () => {
  it("deletes the loginSession matching the refresh token", async () => {
    vi.mocked(prisma.loginSession.deleteMany).mockResolvedValue({ count: 1 });

    await logoutUser("mock-refresh-token");

    expect(prisma.loginSession.deleteMany).toHaveBeenCalledWith({
      where: { refreshToken: "mock-refresh-token" },
    });
  });

  it("does not throw if loginSession does not exist (already logged out)", async () => {
    vi.mocked(prisma.loginSession.deleteMany).mockResolvedValue({ count: 0 });

    await expect(logoutUser("stale-token")).resolves.not.toThrow();
  });
});

describe("resetPassword", () => {
  it("deletes all loginSessions for the user after password reset", async () => {
    vi.mocked(prisma.users.findFirst).mockResolvedValue({
      ...mockUser,
      resetPasswordToken: "valid-token",
      resetPasswordExpires: new Date(Date.now() + 10 * 60 * 1000),
    });

    vi.mocked(prisma.users.update).mockResolvedValue(mockUser);
    vi.mocked(prisma.loginSession.deleteMany).mockResolvedValue({ count: 2 });
    vi.mocked(prisma.$transaction).mockResolvedValue([mockUser, { count: 2 }]);

    await resetPassword("valid-token", "NewPassword123!");

    expect(prisma.$transaction).toHaveBeenCalledOnce();
    expect(prisma.$transaction).toHaveBeenCalledWith([expect.anything(), expect.anything()]);
  });

  it("throws if token is invalid", async () => {
    vi.mocked(prisma.users.findFirst).mockResolvedValue(null);

    await expect(resetPassword("bad-token", "NewPassword123!")).rejects.toThrow("Invalid or expired reset token.");
    expect(prisma.$transaction).not.toHaveBeenCalled();
  });

  it("throws if token is expired", async () => {
    vi.mocked(prisma.users.findFirst).mockResolvedValue(null);

    await expect(resetPassword("expired-token", "NewPassword123!")).rejects.toThrow("Invalid or expired reset token.");
    expect(prisma.$transaction).not.toHaveBeenCalled();
  });

  it("does not wipe loginSessions if password update fails", async () => {
    vi.mocked(prisma.users.findFirst).mockResolvedValue({
      ...mockUser,
      resetPasswordToken: "valid-token",
      resetPasswordExpires: new Date(Date.now() + 10 * 60 * 1000),
    });

    vi.mocked(prisma.$transaction).mockRejectedValue(new Error("DB error"));

    await expect(resetPassword("valid-token", "NewPassword123!")).rejects.toThrow("DB error");
    expect(prisma.$transaction).toHaveBeenCalledOnce();
  });
});
