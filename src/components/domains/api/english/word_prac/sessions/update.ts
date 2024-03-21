import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';
import { sessionsCreate } from '@/components/domains/api/english/word_prac/sessions/create';
import { sessionsDelete } from '@/components/domains/api/english/word_prac/sessions/delete';
import { validateEnglishWordPracSession } from '@/components/domains/api/english/word_prac/sessions/validate';

/**
 * セッションの上書き（削除して保存）
 */
export const sessionsOverwrite = async (sessions: any[]) => {
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

  const prisma = new PrismaClient();

  await prisma.$transaction(async (prisma) => {
    await sessionsDelete(prisma);
    await sessionsCreate(sessions, prisma);
  });
};
