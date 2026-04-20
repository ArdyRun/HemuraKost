import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    // Konfigurasi tambahan Prisma 7 membaca langsung dari prisma.config.ts
    // Tapi jika diperlukan manual override:
    // datasources: { db: { url: process.env.DATABASE_URL } }
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
