import { PrismaClient } from "@prisma/client";

/**
 * Type definition for the global Prisma client instance.
 * Used to prevent multiple instances of PrismaClient in development mode.
 */
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

/**
 * Singleton Prisma Client instance for database operations.
 * 
 * In development mode, this instance is stored globally to prevent creating
 * multiple instances during hot module reloading. In production, a new instance
 * is created for each serverless function invocation.
 * 
 * This pattern ensures optimal database connection pooling and prevents
 * "Too many Prisma Clients" errors in development.
 * 
 * @type {PrismaClient}
 * 
 * @example
 * ```ts
 * import { prisma } from "@/lib/prisma";
 * 
 * const users = await prisma.user.findMany();
 * ```
 */
export const prisma = globalForPrisma.prisma ?? new PrismaClient();

// Store the Prisma instance globally in development to prevent multiple instances
if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;