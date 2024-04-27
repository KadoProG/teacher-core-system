import {
  DocumentData,
  DocumentReference,
  addDoc,
  collection,
  deleteDoc,
  getDocs,
  orderBy,
  query,
  runTransaction,
  where,
} from 'firebase/firestore';
import { firestore } from '@/libs/firebase/firebase';

/**
 * Wordデータを取得する関数
 * @param sessionId
 */
export const fetchEnglishWordPracWordList = async (
  sessionId?: string
): Promise<{ words: IEnglishWordPracWord[] }> => {
  const wordDocRef = collection(firestore, 'words');

  const q = sessionId
    ? query(
        wordDocRef,
        where('session_id', '==', `${sessionId}`),
        orderBy('row')
      )
    : query(wordDocRef, orderBy('row'));

  const querySnapshot = await getDocs(q);
  const words = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as IEnglishWordPracWord[];

  return { words };
};

/**
 * Sessionデータを取得する関数
 */
export const fetchEnglishWordPracSession = async (): Promise<{
  sessions: IEnglishWordPracSession[];
}> => {
  const sessionDocRef = collection(firestore, 'sessions');
  const q = query(sessionDocRef, orderBy('row'));

  const querySnapshot = await getDocs(q);
  const sessions = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as IEnglishWordPracSession[];

  return { sessions };
};

/**
 * 印刷アーカイブデータを取得する関数
 */
export const fetchEnglishWordPracPrint = async (): Promise<{
  prints: IEnglishWordPracPrint[];
}> => {
  const collectionRef = collection(firestore, 'prints');
  const q = query(collectionRef, orderBy('updated_at'));

  const querySnapshot = await getDocs(q);
  const prints = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
    created_at: doc.data().created_at.toDate(),
    updated_at: doc.data().updated_at.toDate(),
  })) as IEnglishWordPracPrint[];

  return { prints };
};

/**
 * Wordデータを上書き保存するプログラム
 * @param words
 */
export const saveEnglishWordPracWordList = async (
  words: IEnglishWordPracWord[]
): Promise<void> => {
  await runTransaction(firestore, async () => {
    const wordDocRef = collection(firestore, 'words');
    const snapShot = await getDocs(wordDocRef);
    snapShot.forEach(async (doc) => {
      await deleteDoc(doc.ref);
    });

    await Promise.all(
      words.map(async (word) => {
        const newWord: IEnglishWordPracWord = {
          row: word.row,
          session_id: word.session_id,
          jp_title: word.jp_title,
          en_title: word.en_title,
          created_at: word.created_at,
          updated_at: word.created_at,
          study_year: word.study_year,
          memo: word.memo,
        };

        await addDoc(wordDocRef, newWord);
      })
    );
  });
};

/**
 * Wordデータを削除するプログラム
 */
export const deleteAllEnglishWordPracWordList = async (): Promise<void> => {
  await runTransaction(firestore, async () => {
    const wordDocRef = collection(firestore, 'words');
    const snapShot = await getDocs(wordDocRef);
    const snapShotRefs: DocumentReference<DocumentData, DocumentData>[] = [];
    snapShot.forEach((doc) => snapShotRefs.push(doc.ref));
    await Promise.all(
      snapShotRefs.map(async (ref) => {
        await deleteDoc(ref);
      })
    );
  });
};

/**
 * 印刷アーカイブを保存するプログラム
 * @param print
 */
export const saveEnglishWordPracPrint = async (
  print: IEnglishWordPracPrint
): Promise<void> => {
  // コネクションを定義
  const collectionRef = collection(firestore, 'prints');

  const newPrint: IEnglishWordPracPrint = {
    title: print.title,
    created_at: print.created_at,
    updated_at: print.updated_at,
    words: print.words,
    email: print.email,
  };
  // 新しいセッションデータを追加
  await addDoc(collectionRef, newPrint);
};

/**
 * Sessionを上書き保存するプログラム
 */
export const saveEnglishWordPracSession = async (
  sessions: IEnglishWordPracSession[]
): Promise<void> => {
  await runTransaction(firestore, async () => {
    // コネクションを定義
    const sessionDocRef = collection(firestore, 'sessions');

    // セッションデータを削除
    const snapShot = await getDocs(sessionDocRef);
    snapShot.forEach(async (doc) => {
      await deleteDoc(doc.ref);
    });

    await Promise.all(
      sessions.map(async (session) => {
        const newSession = {
          row: session.row,
          title: session.title,
          memo: session.memo ?? '',
          created_at: new Date(),
          updated_at: new Date(),
        };

        await addDoc(sessionDocRef, newSession);
      })
    );
  });
};

/**
 * セッションを削除するプログラム
 */
export const deleteAllEnglishWordPracSession = async (): Promise<void> => {
  const sessionDocRef = collection(firestore, 'sessions');
  const snapShot = await getDocs(sessionDocRef);
  const snapShotRefs: DocumentReference<DocumentData, DocumentData>[] = [];
  snapShot.forEach((doc) => snapShotRefs.push(doc.ref));
  await Promise.all(
    snapShotRefs.map(async (ref) => {
      await deleteDoc(ref);
    })
  );
};
