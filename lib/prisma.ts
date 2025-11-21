import { PrismaClient } from "@prisma/client";

// Store Prisma client globally in dev to avoid creating multiple instances during hot reload
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

/**
 * Prisma client instance. Reuses the same instance in dev mode to prevent
 * "Too many Prisma Clients" errors during hot reloading.
 */
export const prisma = globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;