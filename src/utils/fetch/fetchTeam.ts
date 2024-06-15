import {
  arrayUnion,
  collection,
  doc,
  getDocs,
  orderBy,
  query,
  runTransaction,
  where,
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

/**
 * チームにメンバーを追加する関数
 * @param teamId チームID
 * @param email 追加するメンバーのメールアドレス
 */
export const addMemberToTeam = async (
  teamId: string,
  email: string
): Promise<void> => {
  // 1. メールアドレスに対応するユーザーが存在するかどうかを確認
  let userSnapshot;
  const teamRef = doc(collection(firestore, 'teams'), teamId);
  const usersRef = collection(firestore, 'users');
  try {
    const userQuery = query(usersRef, where('email', '==', email));
    userSnapshot = await getDocs(userQuery);
  } catch (e) {
    throw new Error(`ユーザーの取得に失敗しました: ${e}`);
  }

  await runTransaction(firestore, async (transaction) => {
    let userId: string;
    if (userSnapshot.empty) {
      throw new Error('ユーザーが未登録です！');
    } else {
      // ユーザーが存在する場合、既存のユーザーのデータを更新
      try {
        const userDoc = userSnapshot.docs[0];
        const userRef = userDoc.ref;
        userId = userDoc.id; // 既存のユーザーIDを取得
        transaction.update(userRef, {
          teamIds: arrayUnion(teamId),
        });
      } catch (e) {
        throw new Error(`ユーザーの更新に失敗しました: ${e}`);
      }
    }

    try {
      // チームのメンバーリストを更新
      transaction.update(teamRef, {
        members: arrayUnion(userId),
      });
    } catch (e) {
      throw new Error(`チームの更新に失敗しました: ${e}`);
    }
  });
};
