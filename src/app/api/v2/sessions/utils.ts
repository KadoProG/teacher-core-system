import {
  addDoc,
  collection,
  deleteDoc,
  getDocs,
  runTransaction,
} from 'firebase/firestore';
import { NextResponse } from 'next/server';
import { validateEnglishWordPracSession } from '@/components/domains/api/english/word_prac/sessions/validate';
import { firestore } from '@/libs/firebase/firebase';

export const sessionCreate = async (session: any): Promise<NextResponse> => {
  const validatedErrors = validateEnglishWordPracSession(session, 'create');
  if (validatedErrors.length !== 0) {
    return NextResponse.json({ errors: validatedErrors }, { status: 400 });
  }
  // コネクションを定義
  const sessionDocRef = collection(firestore, 'sessions');
  const newSession = {
    row: session.row,
    title: session.title,
    memo: session.memo ?? '',
    created_at: new Date(),
    updated_at: new Date(),
  };

  // 新しいセッションデータを追加
  await addDoc(sessionDocRef, newSession);

  return NextResponse.json({}, { status: 201 });
};

export const sessionsCreate = async (
  sessions: any[]
): Promise<NextResponse> => {
  const validatedErrors: string[] = [];

  sessions.forEach((session: any) => {
    const singleValidatedErrors = validateEnglishWordPracSession(
      session,
      'create'
    );
    if (singleValidatedErrors.length !== 0) {
      validatedErrors.push(...singleValidatedErrors);
    }
  });

  if (validatedErrors.length !== 0) {
    return NextResponse.json({ errors: validatedErrors }, { status: 400 });
  }

  await runTransaction(firestore, async () => {
    // コネクションを定義
    const sessionDocRef = collection(firestore, 'sessions');
    Promise.all(
      sessions.map(async (session) => {
        const newSession = {
          row: session.row,
          title: session.title,
          memo: session.memo ?? '',
          created_at: new Date(),
          updated_at: new Date(),
        };
        // 新しいセッションデータを追加
        await addDoc(sessionDocRef, newSession);
      })
    );
  });

  return NextResponse.json({}, { status: 201 });
};

export const sessionsOverwrite = async (
  sessions: any[]
): Promise<NextResponse> => {
  const validatedErrors: string[] = [];

  sessions.forEach((session: any) => {
    const singleValidatedErrors = validateEnglishWordPracSession(
      session,
      'create'
    );
    if (singleValidatedErrors.length !== 0) {
      validatedErrors.push(...singleValidatedErrors);
    }
  });

  if (validatedErrors.length !== 0) {
    return NextResponse.json({ errors: validatedErrors }, { status: 400 });
  }
  await runTransaction(firestore, async () => {
    // コネクションを定義
    const sessionDocRef = collection(firestore, 'sessions');

    // セッションデータを削除
    const snapShot = await getDocs(sessionDocRef);
    snapShot.forEach(async (doc) => {
      await deleteDoc(doc.ref);
    });

    Promise.all(
      sessions.map(async (session) => {
        const newSession = {
          row: session.row,
          title: session.title,
          memo: session.memo ?? '',
          created_at: new Date(),
          updated_at: new Date(),
        };
        // 新しいセッションデータを追加
        await addDoc(sessionDocRef, newSession);
      })
    );
  });

  return NextResponse.json({}, { status: 200 });
};
