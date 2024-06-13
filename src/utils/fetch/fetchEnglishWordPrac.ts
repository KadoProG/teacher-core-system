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
} from 'firebase/firestore';
import { firestore } from '@/libs/firebase/firebase';

/**
 * Sessionデータを取得する関数
 */
export const fetchEnglishWordPracSession = async (
  teamId: ITeam['id']
): Promise<{ sessions: IEnglishWordPracSession[] }> => {
  if (!teamId) return { sessions: [] };
  const collectionRef = collection(firestore, 'teams', teamId, 'sessions');
  const q = query(collectionRef, orderBy('row'));
  const querySnapshot = await getDocs(q);

  const sessions = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    words: doc.data().words ?? [],
    ...doc.data(),
  })) as IEnglishWordPracSession[];

  return { sessions };
};

/**
 * Sessionを上書き保存するプログラム
 */
export const saveEnglishWordPracSession = async (
  sessions: IEnglishWordPracSession[],
  teamId: ITeam['id']
): Promise<void> => {
  if (!teamId) throw new Error('teamId is required');
  await runTransaction(firestore, async () => {
    // コネクションを定義
    const sessionDocRef = collection(firestore, 'teams', teamId, 'sessions');

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
export const deleteAllEnglishWordPracSession = async (
  teamId: ITeam['id']
): Promise<void> => {
  if (!teamId) throw new Error('teamId is required');
  // コネクションを定義
  const sessionDocRef = collection(firestore, 'teams', teamId, 'sessions');

  // セッションデータを削除
  const snapShot = await getDocs(sessionDocRef);
  const snapShotRefs: DocumentReference<DocumentData, DocumentData>[] = [];
  snapShot.forEach((doc) => snapShotRefs.push(doc.ref));
  await Promise.all(
    snapShotRefs.map(async (ref) => {
      await deleteDoc(ref);
    })
  );
};
