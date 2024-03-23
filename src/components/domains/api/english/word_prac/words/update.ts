import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';
import { wordsCreate } from '@/components/domains/api/english/word_prac/words/create';
import { wordsDelete } from '@/components/domains/api/english/word_prac/words/delete';
import { validateEnglishWordPracWord } from '@/components/domains/api/english/word_prac/words/validate';

/**
 * セッションの上書き（削除して保存）
 */
export const wordsOverwrite = async (words: any[]) => {
  const validatedErrors: string[] = [];
  words.forEach((session: any) => {
    // バリデートチェック
    const singleValidatedErrors = validateEnglishWordPracWord(
      session,
      'create'
    );

    if (singleValidatedErrors.length !== 0) {
      // return validatedErrors;
      validatedErrors.push(...singleValidatedErrors);
    }
  });
  if (validatedErrors.length !== 0) {
    return NextResponse.json({ errors: validatedErrors }, { status: 400 });
  }

  const prisma = new PrismaClient();

  await prisma.$transaction(async (prisma) => {
    await wordsDelete(prisma);
    await wordsCreate(words, prisma);
  });
};
