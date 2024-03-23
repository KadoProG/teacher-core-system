import { PrismaClient } from '@prisma/client';

export const wordsDelete = async (
  prismaIncludeTransaction?: PrismaIncludeTransaction
) => {
  const prisma = prismaIncludeTransaction ?? new PrismaClient();
  await prisma.englishWordPracWord.deleteMany();
};
