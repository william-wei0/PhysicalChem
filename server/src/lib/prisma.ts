import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../../generated/prisma/client";

const userConnectionString = `${process.env.DATABASE_URL_USER}`;
const userAdapter = new PrismaPg({ connectionString: userConnectionString });
const userPrisma = new PrismaClient({ adapter: userAdapter });

const adminConnectionString = `${process.env.DATABASE_URL_ADMIN}`;
const adminAdapter = new PrismaPg({ connectionString: adminConnectionString });
const adminPrisma = new PrismaClient({ adapter: adminAdapter });

export async function withUserContext<T>(
  userId: number,
  fn: (tx: Omit<PrismaClient, "$connect" | "$disconnect" | "$on" | "$transaction" | "$use" | "$extends">) => Promise<T>
): Promise<T> {
  return userPrisma.$transaction(async (tx) => {
    await tx.$executeRaw`SELECT set_config('app.current_user_id', ${userId.toString()}, true)`;
    return fn(tx);
  });
}

export async function withAdminContext<T>(
  fn: (client: PrismaClient) => Promise<T>
): Promise<T> {
  return fn(adminPrisma);
}