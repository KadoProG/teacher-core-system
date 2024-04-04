import { PrismaClient } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { NextRequest, NextResponse } from 'next/server';
import {
  wordCreate,
  wordsCreate,
} from '@/components/domains/api/english/word_prac/words/create';
import { wordsDelete } from '@/components/domains/api/english/word_prac/words/delete';
import { wordsOverwrite } from '@/components/domains/api/english/word_prac/words/update';

/**
 * EnglishWordデータの取得
 */
export const GET = async (req: NextRequest) => {
  const { searchParams } = new URL(req.url);
  const session_id = searchParams.get('session_id');

  try {
    const prisma = new PrismaClient();

    let queryFilter = {};

    if (session_id) {
      queryFilter = {
        where: {
          session_id: Number(session_id),
        },
      };
    }

    const words = await prisma.englishWordPracWord.findMany(queryFilter);
    return NextResponse.json({ words });
  } catch (e) {
    return NextResponse.json({ error: e });
  }
};

/**
 * EnglishWordの追加
 */
export const POST = async (req: NextRequest) => {
  const { word, words } = await req.json();
  try {
    if (!word && !words) {
      throw new Error('I do not know what to do');
    }

    // Wordを作成（単体）
    word && (await wordCreate(word));

    // Wordを作成（複数）
    words && (await wordsCreate(words));

    return NextResponse.json({});
  } catch (e: any) {
    if (e instanceof PrismaClientKnownRequestError) {
      if (e.code === 'P2002') {
        // 一意制約違反エラー
        return NextResponse.json(
          { errors: 'Row already exists' },
          { status: 400 }
        );
      }
      return NextResponse.json({ errors: e }, { status: 400 });
    }

    // それ以外のエラーは400で
    return NextResponse.json({ errors: e.message as string }, { status: 400 });
  }
};

/**
 * EnglishWordの上書き
 */
export const PUT = async (req: NextRequest) => {
  try {
    const { words } = await req.json();

    if (!words) {
      return NextResponse.json({ error: 'words is required' }, { status: 400 });
    }

    // セッションの上書き（削除して保存）
    await wordsOverwrite(words);

    return NextResponse.json({});
  } catch (e: any) {
    if (e instanceof PrismaClientKnownRequestError && e.code === 'P2002') {
      // 一意制約違反エラー
      return NextResponse.json(
        { errors: 'Row already exists' },
        { status: 400 }
      );
    }
    // それ以外のエラーは400で
    return NextResponse.json({ errors: e.message as string }, { status: 400 });
  }
};

export const DELETE = async () => {
  try {
    await wordsDelete();
    return NextResponse.json({});
  } catch (e) {
    // それ以外のエラーは500で
    return NextResponse.json({ error: e }, { status: 500 });
  }
};
