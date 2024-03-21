import { PrismaClient } from '@prisma/client';

export const sessionsDelete = async (
  extendedPrisma?: PrismaIncludeTransaction
) => {
  const prisma = extendedPrisma ?? new PrismaClient();
  await prisma.englishWordPracSession.deleteMany();
};
