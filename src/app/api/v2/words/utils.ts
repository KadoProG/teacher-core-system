import {
  addDoc,
  collection,
  deleteDoc,
  getDocs,
  runTransaction,
} from 'firebase/firestore';
import { NextResponse } from 'next/server';
import { validateEnglishWordPracWord } from '@/components/domains/api/english/word_prac/words/validate';
import { firestore } from '@/libs/firebase/firebase';

export const wordCreate = async (word: any) => {
  const validatedErrors = validateEnglishWordPracWord(word, 'create');
  if (validatedErrors.length !== 0) {
    return NextResponse.json({ errors: validatedErrors }, { status: 400 });
  }

  const wordDocRef = collection(firestore, 'words');

  const newWord: IEnglishWordPracWord = {
    row: word.row,
    session_id: word.session_id,
    jp_title: word.jp_title,
    en_title: word.en_title,
    created_at: new Date(),
    updated_at: new Date(),
    study_year: word.study_year,
    memo: word.memo ?? '',
  };

  await addDoc(wordDocRef, newWord);
};

export const wordsCreate = async (words: any[]) => {
  const validatedErrors: string[] = [];

  words.forEach((word) => {
    const singleValidatedErrors = validateEnglishWordPracWord(word, 'create');

    if (singleValidatedErrors.length !== 0) {
      validatedErrors.push(...singleValidatedErrors);
    }
  });

  if (validatedErrors.length !== 0) {
    return NextResponse.json({ errors: validatedErrors }, { status: 400 });
  }

  await runTransaction(firestore, async () => {
    const wordDocRef = collection(firestore, 'words');
    Promise.all(
      words.map(async (word) => {
        const newWord: IEnglishWordPracWord = {
          row: word.row,
          session_id: word.session_id,
          jp_title: word.jp_title,
          en_title: word.en_title,
          created_at: new Date(),
          updated_at: new Date(),
          study_year: word.study_year,
          memo: word.memo ?? '',
        };

        await addDoc(wordDocRef, newWord);
      })
    );
  });

  return NextResponse.json({}, { status: 201 });
};

export const wordsOverwrite = async (words: any[]) => {
  const validatedErrors: string[] = [];

  words.forEach((word) => {
    const singleValidatedErrors = validateEnglishWordPracWord(word, 'create');

    if (singleValidatedErrors.length !== 0) {
      validatedErrors.push(...singleValidatedErrors);
    }
  });

  if (validatedErrors.length !== 0) {
    return NextResponse.json({ errors: validatedErrors }, { status: 400 });
  }

  await runTransaction(firestore, async () => {
    const wordDocRef = collection(firestore, 'words');
    const snapShot = await getDocs(wordDocRef);
    snapShot.forEach(async (doc) => {
      await deleteDoc(doc.ref);
    });

    Promise.all(
      words.map(async (word) => {
        const newWord: IEnglishWordPracWord = {
          row: word.row,
          session_id: word.session_id,
          jp_title: word.jp_title,
          en_title: word.en_title,
          created_at: new Date(),
          updated_at: new Date(),
          study_year: word.study_year,
          memo: word.memo ?? '',
        };

        await addDoc(wordDocRef, newWord);
      })
    );
  });
};
