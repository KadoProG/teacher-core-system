import {
  DocumentData,
  DocumentReference,
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  runTransaction,
} from 'firebase/firestore';
import { firestore } from '@/libs/firebase/firebase';

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
    words: doc.data().words ?? [],
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
          title: session.title,
          row: session.row,
          memo: session.memo ?? '',
          created_at: new Date(),
          updated_at: new Date(),
          words: session.words,
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

/**
 * 印刷アーカイブの単体削除
 * @param printId
 */
export const deleteEnglishWordPracPrint = async (
  printId: string
): Promise<void> => {
  // 単体取得
  const docRef = doc(firestore, 'prints', printId);
  const snapshot = await getDoc(docRef);

  if (!snapshot.exists()) {
    throw new Error('not found');
  }
  await deleteDoc(docRef);
};
