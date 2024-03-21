import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';
import { validateEnglishWordPracSession } from '@/components/domains/api/english/word_prac/sessions/validate';

/**
 * セッションを作成（単体）
 */
export const sessionCreate = async (
  session: any,
  extendedPrisma?: PrismaClient
) => {
  // バリデートチェック
  const validatedErrors = validateEnglishWordPracSession(session, 'create');
  if (validatedErrors.length !== 0) {
    return NextResponse.json({ errors: validatedErrors }, { status: 400 });
  }

  const prisma = extendedPrisma ?? new PrismaClient();

  // 作成
  await prisma.englishWordPracSession.create({
    data: {
      row: session.row,
      title: session.title,
    },
  });
};

/**
 * セッションを作成（複数）
 */
export const sessionsCreate = async (
  sessions: any[],
  prismaIncludeTransaction?: PrismaIncludeTransaction
) => {
  const validatedErrors: string[] = [];
  sessions.forEach((session: any) => {
    // バリデートチェック
    const singleValidatedErrors = validateEnglishWordPracSession(
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

  if (prismaIncludeTransaction) {
    const prisma = prismaIncludeTransaction;
    await createMany(sessions, prisma);
  } else {
    const prisma = new PrismaClient();
    prisma.$transaction(async (prisma) => await createMany(sessions, prisma));
  }
};

/**
 * Transactionを含む前提でsessionsを付与
 */
const createMany = async (
  sessions: any[],
  prismaIncludeTransaction: PrismaIncludeTransaction
) => {
  await Promise.all(
    sessions.map(async (session: any) => {
      await prismaIncludeTransaction.englishWordPracSession.create({
        data: {
          ...session,
        },
      });
    })
  );
};
