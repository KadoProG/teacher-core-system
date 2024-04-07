import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';
import { validateEnglishWordPracPrint } from '@/components/domains/api/english/word_prac/prints/validate';

/**
 * プリントデータを新規登録
 */
export const printCreate = async (
  print: any,
  prismaIncludeTransaction?: PrismaIncludeTransaction
) => {
  // バリデートチェック
  const validatedErrors = validateEnglishWordPracPrint(print, 'create');

  if (validatedErrors.length !== 0) {
    return NextResponse.json({ errors: validatedErrors }, { status: 400 });
  }

  if (prismaIncludeTransaction) {
    const prisma = prismaIncludeTransaction;
    const printId = await createPrintRow(print, prisma);
    await createPrintWords(printId, print.words, prisma);
  } else {
    const prisma = new PrismaClient();
    prisma.$transaction(async (prisma) => {
      const printId = await createPrintRow(print, prisma);
      await createPrintWords(printId, print.words, prisma);
    });
  }
};

/**
 * 印刷アーカイブ挿入
 */
const createPrintRow = async (
  print: any,
  prismaIncludeTransaction: PrismaIncludeTransaction
) => {
  const printRow = await prismaIncludeTransaction.englishWordPracPrint.create({
    data: {
      title: print.title,
    },
  });
  return printRow.id;
};

/**
 * 印刷アーカイブの単語挿入
 */
const createPrintWords = async (
  print_id: number,
  words: any[],
  prismaIncludeTransaction: PrismaIncludeTransaction
) => {
  await Promise.all(
    words.map(async (word) => {
      await prismaIncludeTransaction.englishWordPracPrintWord.create({
        data: {
          print_id,
          jp_title: word.jp_title,
          en_title: word.en_title,
          type: word.type,
        },
      });
    })
  );
};
