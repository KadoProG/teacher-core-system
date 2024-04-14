import { NextRequest, NextResponse } from 'next/server';
import { printCreate, printsGET } from '@/app/api/v2/prints/utils';
import { checkAuth } from '@/utils/api/checkAuth';

export const GET = async () => {
  const isAuthenticated = await checkAuth();
  if (!isAuthenticated) {
    return NextResponse.json({ error: '未認証ユーザ' }, { status: 403 });
  }
  try {
    return await printsGET();
  } catch (e) {
    return NextResponse.json({ error: e });
  }
};

/**
 * プリントの追加
 */
export const POST = async (req: NextRequest) => {
  const isAuthenticated = await checkAuth();
  if (!isAuthenticated) {
    return NextResponse.json({ error: '未認証ユーザ' }, { status: 403 });
  }
  const { print } = await req.json();

  if (!print) {
    return NextResponse.json({ error: 'no data' }, { status: 400 });
  }

  try {
    // プリントを作成（単体）
    return await printCreate(print);
  } catch (e) {
    return NextResponse.json({ error: e }, { status: 400 });
  }
};
