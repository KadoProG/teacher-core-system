import { PrismaClient } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { NextRequest, NextResponse } from 'next/server';
import {
  sessionCreate,
  sessionsCreate,
} from '@/components/domains/api/english/word_prac/sessions/create';
import { sessionsDelete } from '@/components/domains/api/english/word_prac/sessions/delete';
import { sessionsOverwrite } from '@/components/domains/api/english/word_prac/sessions/update';
import { checkAuth } from '@/utils/api/checkAuth';

export const GET = async () => {
  const isAuthenticated = await checkAuth();
  if (!isAuthenticated) {
    return NextResponse.json({ error: '未認証ユーザ' }, { status: 403 });
  }
  try {
    const prisma = new PrismaClient();
    const sessions = await prisma.englishWordPracSession.findMany();
    return NextResponse.json({ sessions });
  } catch (e) {
    return NextResponse.json({ error: e });
  }
};

/**
 * セッションの追加
 */
export const POST = async (req: NextRequest) => {
  const isAuthenticated = await checkAuth();
  if (!isAuthenticated) {
    return NextResponse.json({ error: '未認証ユーザ' }, { status: 403 });
  }
  const { session, sessions } = await req.json();
  try {
    // セッションを作成（単体）
    session && (await sessionCreate(session));

    // セッションを作成（複数）
    sessions && (await sessionsCreate(sessions));

    return NextResponse.json({});
  } catch (e) {
    if (e instanceof PrismaClientKnownRequestError && e.code === 'P2002') {
      // 一意制約違反エラー
      return NextResponse.json(
        { errors: `Row ${session?.row} already exists` },
        { status: 400 }
      );
    }
    // それ以外のエラーは500で
    return NextResponse.json({ error: e }, { status: 500 });
  }
};

/**
 * セッションの上書き
 */
export const PUT = async (req: NextRequest) => {
  const isAuthenticated = await checkAuth();
  if (!isAuthenticated) {
    return NextResponse.json({ error: '未認証ユーザ' }, { status: 403 });
  }
  try {
    const { sessions } = await req.json();

    if (!sessions) {
      return NextResponse.json(
        { error: 'sessions is required' },
        { status: 400 }
      );
    }

    // セッションの上書き（削除して保存）
    await sessionsOverwrite(sessions);

    return NextResponse.json({});
  } catch (e) {
    if (e instanceof PrismaClientKnownRequestError && e.code === 'P2002') {
      // 一意制約違反エラー
      return NextResponse.json(
        { errors: 'Row already exists' },
        { status: 400 }
      );
    }
    // それ以外のエラーは500で
    return NextResponse.json({ error: e }, { status: 500 });
  }
};

export const DELETE = async () => {
  const isAuthenticated = await checkAuth();
  if (!isAuthenticated) {
    return NextResponse.json({ error: '未認証ユーザ' }, { status: 403 });
  }
  try {
    await sessionsDelete();
    return NextResponse.json({});
  } catch (e) {
    // それ以外のエラーは500で
    return NextResponse.json({ error: e }, { status: 500 });
  }
};
