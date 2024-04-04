import { PrismaClient } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { NextRequest, NextResponse } from 'next/server';
import { printCreate } from '@/components/domains/api/english/word_prac/prints/create';

/**
 * 印刷アーカイブデータの取得
 */
export const GET = async () => {
  try {
    const prisma = new PrismaClient();

    let queryFilter = {
      include: {
        words: true,
      },
    };

    const prints = await prisma.englishWordPracPrint.findMany(queryFilter);
    return NextResponse.json({ prints });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 400 });
  }
};

/**
 * 印刷アーカイブデータの追加
 */
export const POST = async (req: NextRequest) => {
  const { print } = await req.json();

  try {
    if (!print) {
      throw new Error('I do not know what to do');
    }

    await printCreate(print);
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
