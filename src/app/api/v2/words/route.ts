import {
  collection,
  deleteDoc,
  getDocs,
  orderBy,
  query,
  where,
} from 'firebase/firestore';
import { NextRequest, NextResponse } from 'next/server';
import {
  wordCreate,
  wordsCreate,
  wordsOverwrite,
} from '@/app/api/v2/words/utils';
import { firestore } from '@/libs/firebase/firebase';
import { checkAuth } from '@/utils/api/checkAuth';

/**
 * EnglishWordデータの取得
 */
export const GET = async (req: NextRequest) => {
  const isAuthenticated = await checkAuth();
  if (!isAuthenticated) {
    return NextResponse.json({ error: '未認証ユーザ' }, { status: 403 });
  }

  const { searchParams } = new URL(req.url);
  const session_id = searchParams.get('session_id');

  try {
    const wordDocRef = collection(firestore, 'words');

    const q = session_id
      ? query(
          wordDocRef,
          where('session_id', '==', `${session_id}`),
          orderBy('row')
        )
      : query(wordDocRef, orderBy('row'));

    const querySnapshot = await getDocs(q);
    const newWords = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return NextResponse.json({ words: newWords });
  } catch (e) {
    return NextResponse.json({ error: e }, { status: 400 });
  }
};

/**
 * EnglishWordの追加
 */
export const POST = async (req: NextRequest) => {
  const isAuthenticated = await checkAuth();
  if (!isAuthenticated) {
    return NextResponse.json({ error: '未認証ユーザ' }, { status: 403 });
  }

  const { word, words } = await req.json();

  if (!word && !words) {
    return NextResponse.json({ error: 'no data' }, { status: 400 });
  }

  try {
    // Wordを作成（単体）
    if (word) {
      return await wordCreate(word);
    }
    // Wordを作成（複数）
    if (words) {
      return await wordsCreate(words);
    }
  } catch (e: any) {
    return NextResponse.json({ errors: e.message as string }, { status: 400 });
  }
};

/**
 * Wordの上書き
 */
export const PUT = async (req: NextRequest) => {
  const isAuthenticated = await checkAuth();
  if (!isAuthenticated) {
    return NextResponse.json({ error: '未認証ユーザ' }, { status: 403 });
  }
  try {
    const { words } = await req.json();

    if (!words) {
      return NextResponse.json({ error: 'words is required' }, { status: 400 });
    }

    // Wordの上書き（削除して保存）
    return await wordsOverwrite(words);
  } catch (e) {
    return NextResponse.json({ error: e }, { status: 400 });
  }
};

export const DELETE = async () => {
  const isAuthenticated = await checkAuth();
  if (!isAuthenticated) {
    return NextResponse.json({ error: '未認証ユーザ' }, { status: 403 });
  }
  try {
    const wordDocRef = collection(firestore, 'words');
    const snapShot = await getDocs(wordDocRef);
    snapShot.forEach(async (doc) => {
      await deleteDoc(doc.ref);
    });
    return NextResponse.json({}, { status: 200 });
  } catch (e) {
    return NextResponse.json({ error: e }, { status: 400 });
  }
};
