import {
  arrayUnion,
  collection,
  doc,
  getDocs,
  orderBy,
  query,
  runTransaction,
} from 'firebase/firestore';
import { firestore } from '@/libs/firebase/firebase';

export const fetchTeam = async (): Promise<{ teams: ITeam[] }> => {
  const collectionRef = collection(firestore, 'teams');
  const q = query(collectionRef, orderBy('created_at'));

  const querySnapshot = await getDocs(q);
  const teams = querySnapshot.docs.map((doc) => {
    const data = doc.data();
    return {
      id: doc.id,
      name: data.name,
      members: data.members ?? [],
      sessions: data.session ?? [],
      created_at: data.created_at.toDate(),
      updated_at: data.updated_at.toDate(),
    };
  }) as ITeam[];

  return { teams };
};

export const addTeam = async (team: ITeam, userId: string): Promise<void> => {
  await runTransaction(firestore, async (transaction) => {
    // コネクションを定義
    const newTeamRef = doc(collection(firestore, 'teams'));
    const userRef = doc(collection(firestore, 'users'), userId);

    // トランザクションを実行
    transaction.set(newTeamRef, {
      name: team.name,
      members: team.members,
      sessions: [],
      created_at: team.created_at,
      updated_at: team.updated_at,
    });

    transaction.update(userRef, {
      teamIds: arrayUnion(newTeamRef.id),
    });
  });
};

export const updateTeam = async (team: ITeam): Promise<void> => {
  await runTransaction(firestore, async (transaction) => {
    // コネクションを定義
    const docRef = doc(collection(firestore, 'teams'), team.id);

    // トランザクションを実行
    transaction.update(docRef, {
      name: team.name,
      members: team.members,
      updated_at: team.updated_at,
    });
  });
};
