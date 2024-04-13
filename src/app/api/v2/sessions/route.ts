import {
  collection,
  deleteDoc,
  getDocs,
  orderBy,
  query,
} from 'firebase/firestore';
import { NextRequest, NextResponse } from 'next/server';
import {
  sessionCreate,
  sessionsCreate,
  sessionsOverwrite,
} from '@/app/api/v2/sessions/utils';
import { firestore } from '@/libs/firebase/firebase';
import { checkAuth } from '@/utils/api/checkAuth';

export const GET = async () => {
  const isAuthenticated = await checkAuth();
  if (!isAuthenticated) {
    return NextResponse.json({ error: '未認証ユーザ' }, { status: 403 });
  }
  try {
    const sessionDocRef = collection(firestore, 'sessions');
    const q = query(sessionDocRef, orderBy('row'));

    const querySnapshot = await getDocs(q);
    const newSessions = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return NextResponse.json({ sessions: newSessions });
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
  } catch (e) {
    return NextResponse.json({ error: e }, { status: 400 });
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
    const sessionDocRef = collection(firestore, 'sessions');
    const snapShot = await getDocs(sessionDocRef);
    snapShot.forEach(async (doc) => {
      await deleteDoc(doc.ref);
    });
    return NextResponse.json({}, { status: 200 });
  } catch (e) {
    return NextResponse.json({ error: e }, { status: 400 });
  }
};
