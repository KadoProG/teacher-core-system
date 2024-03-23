import { PrismaClient } from '@prisma/client';

export const sessionsDelete = async (
  prismaIncludeTransaction?: PrismaIncludeTransaction
) => {
  const prisma = prismaIncludeTransaction ?? new PrismaClient();
  await prisma.englishWordPracSession.deleteMany();
};
