import {
  addDoc,
  collection,
  getDocs,
  orderBy,
  query,
} from 'firebase/firestore';
import { NextResponse } from 'next/server';
import { validateEnglishWordPracPrint } from '@/components/domains/api/english/word_prac/prints/validate';
import { firestore } from '@/libs/firebase/firebase';

export const printsGET = async (): Promise<NextResponse> => {
  const collectionRef = collection(firestore, 'prints');
  const q = query(collectionRef, orderBy('updated_at'));

  const querySnapshot = await getDocs(q);
  const prints = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
    created_at: doc.data().created_at.toDate(),
    updated_at: doc.data().updated_at.toDate(),
  }));
  return NextResponse.json({ prints });
};

export const printCreate = async (print: any): Promise<NextResponse> => {
  // バリデートチェック
  const validatedErrors = validateEnglishWordPracPrint(print, 'create');

  if (validatedErrors.length !== 0) {
    return NextResponse.json({ errors: validatedErrors }, { status: 400 });
  }

  // コネクションを定義
  const collectionRef = collection(firestore, 'prints');

  const newPrint: IEnglishWordPracPrint = {
    title: print.title,
    created_at: new Date(),
    updated_at: new Date(),
    words: print.words,
  };
  // 新しいセッションデータを追加
  await addDoc(collectionRef, newPrint);

  return NextResponse.json({}, { status: 201 });
};
