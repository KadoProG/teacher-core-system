import {
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
 * 印刷アーカイブデータを取得する関数
 * @returns {prints: IEnglishWordPracPrint[]} 印刷アーカイブデータ
 */
export const fetchEnglishWordPracPrintArchives = async (): Promise<{
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
 * 印刷アーカイブを上書き保存するプログラム
 * @param printArchives 印刷アーカイブデータ
 * @param isOverWrite 上書きするかどうか true: 上書きする false: 追加する (default: false)
 */
export const saveEnglishWordPracPrintArchives = async (
  printArchives: IEnglishWordPracPrint[],
  isOverWrite?: boolean
): Promise<void> => {
  await runTransaction(firestore, async () => {
    // コネクションを定義
    const collectionRef = collection(firestore, 'prints');

    if (isOverWrite) {
      // プリントデータを削除
      const snapShot = await getDocs(collectionRef);
      snapShot.forEach(async (doc) => {
        await deleteDoc(doc.ref);
      });
    }

    await Promise.all(
      printArchives.map(async (printArchive) => {
        const newPrint: IEnglishWordPracPrint = {
          title: printArchive.title,
          created_at: printArchive.created_at,
          updated_at: printArchive.updated_at,
          words: printArchive.words,
          email: printArchive.email,
        };
        // 新しいセッションデータを追加
        await addDoc(collectionRef, newPrint);
      })
    );
  });
};

/**
 * 印刷アーカイブを削除するプログラム（単体）
 * @param printArchiveId 印刷アーカイブID
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
