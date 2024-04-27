import { collection, getDocs, orderBy, query, where } from 'firebase/firestore';
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
