import {
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
  sessionId: string
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

/**
 * Wordデータを削除するプログラム
 */
export const deleteAllEnglishWordPracWordList = async (): Promise<void> => {
  const wordDocRef = collection(firestore, 'words');
  const snapShot = await getDocs(wordDocRef);
  snapShot.forEach(async (doc) => {
    await deleteDoc(doc.ref);
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
    created_at: new Date(),
    updated_at: new Date(),
    words: print.words,
    email: print.email,
  };
  // 新しいセッションデータを追加
  await addDoc(collectionRef, newPrint);
};
