import bcrypt from "bcrypt";
import AppError from "../errors/AppError";
import { getUserByEmail } from "../users/userService";
import { generateAccessToken, generateRefreshToken } from "../utils/tokens";

export const loginUser = async (email: string, password: string) => {
  const user = await getUserByEmail(email);

  if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
    throw new AppError("Invalid email or password.", 401);
  }

  const accessToken = generateAccessToken(user.id);
  const refreshToken = generateRefreshToken(user.id);

  return {
    accessToken,
    refreshToken,
    user: {
      id: user.id,
      username: user.username,
      email: user.email,
    },
  };
};