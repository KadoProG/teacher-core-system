import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';
import { validateEnglishWordPracWord } from '@/components/domains/api/english/word_prac/words/validate';

/**
 * セッションを作成（単体）
 */
export const wordCreate = async (
  word: any,
  extendedPrisma?: PrismaIncludeTransaction
) => {
  // バリデートチェック
  const validatedErrors = validateEnglishWordPracWord(word, 'create');
  if (validatedErrors.length !== 0) {
    return NextResponse.json({ errors: validatedErrors }, { status: 400 });
  }

  const prisma = extendedPrisma ?? new PrismaClient();

  // 作成
  await prisma.englishWordPracWord.create({
    data: {
      ...word,
    },
  });
};

/**
 * Wordを作成（複数）
 */
export const wordsCreate = async (
  words: any[],
  prismaIncludeTransaction?: PrismaIncludeTransaction
) => {
  const validatedErrors: string[] = [];
  words.forEach((word: any) => {
    // バリデートチェック
    const singleValidatedErrors = validateEnglishWordPracWord(word, 'create');

    if (singleValidatedErrors.length !== 0) {
      validatedErrors.push(...singleValidatedErrors);
    }
  });
  if (validatedErrors.length !== 0) {
    throw new Error(validatedErrors.join(', ')); // エラーをスローして呼び出し元でキャッチする
  }

  if (prismaIncludeTransaction) {
    const prisma = prismaIncludeTransaction;
    await createMany(words, prisma);
  } else {
    const prisma = new PrismaClient();
    await prisma.$transaction(async (prisma) => {
      await createMany(words, prisma);
    });
  }
};

/**
 * Transactionを含む前提でwordsを付与
 */
const createMany = async (
  words: any[],
  prismaIncludeTransaction: PrismaIncludeTransaction
) => {
  await Promise.all(
    words.map(async (word: any) => {
      await prismaIncludeTransaction.englishWordPracWord.create({
        data: {
          ...word,
        },
      });
    })
  );
};
