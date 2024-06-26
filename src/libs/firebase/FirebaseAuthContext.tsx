'use client';

import { doc, getDoc, setDoc } from '@firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import { collection } from 'firebase/firestore';
import React from 'react';
import { useSnackbar } from '@/components/commons/feedback/SnackbarContext';
import { useTopAlertCard } from '@/components/commons/feedback/TopAlertCardContext';
import { firebaseAuth, firestore } from '@/libs/firebase/firebase';

type UserContextType = IUser | null | undefined;

const FirebaseAuthContext = React.createContext<{
  user: UserContextType;
  teams: ITeam[];
  selectedTeamId: string | undefined;
  saveRecentTeamId: (teamId: string | undefined) => void;
}>({
  user: undefined,
  teams: [],
  selectedTeamId: undefined,
  saveRecentTeamId: () => {},
});

export const FirebaseAuthProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [user, setUser] = React.useState<UserContextType>();
  const [teams, setTeams] = React.useState<ITeam[]>([]);
  const [selectedTeamId, setSelectedTeamId] = React.useState<
    string | undefined
  >();
  const { addTopAlertCard } = useTopAlertCard();
  const { addMessageObject } = useSnackbar();

  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      firebaseAuth,
      async (firebaseUser) => {
        if (firebaseUser) {
          let teamIds: string[] = [];
          try {
            const collectionRef = collection(firestore, 'users');
            const userRef = doc(collectionRef, firebaseUser.uid);

            const userDoc = await getDoc(userRef);

            if (userDoc.exists()) {
              const appUser = userDoc.data() as IUser;
              if (!appUser.recentTeamId) {
                appUser.recentTeamId = appUser.teamIds[0] ?? null;
              }

              setUser(appUser);
              setSelectedTeamId(appUser.recentTeamId);

              // ユーザー情報が更新されている場合は更新
              if (
                appUser.name !== firebaseUser.displayName ||
                appUser.email !== firebaseUser.email ||
                appUser.photoURL !== firebaseUser.photoURL
              ) {
                await setDoc(userRef, {
                  ...appUser,
                  name: firebaseUser.displayName,
                  email: firebaseUser.email,
                  photoURL: firebaseUser.photoURL,
                });
              }

              // チームIDのリストを取得
              teamIds = appUser.teamIds;
            } else {
              // ユーザーが存在しない場合は新規作成
              const appUser: IUser = {
                id: firebaseUser.uid,
                name: firebaseUser.displayName!,
                email: firebaseUser.email!,
                photoURL: firebaseUser.photoURL!,
                teamIds: [],
                recentTeamId: null,
              };

              await setDoc(userRef, appUser).then(() => {
                setUser(appUser);
              });
            }

            const preNewTeams = await Promise.all(
              teamIds.map(async (teamId) => {
                const teamDoc = await getDoc(doc(firestore, 'teams', teamId));
                if (teamDoc.exists()) {
                  return { id: teamId, ...teamDoc.data() } as ITeam;
                }
                return;
              })
            );

            const newTeams = preNewTeams.filter(
              (team) => team !== undefined
            ) as ITeam[];

            setTeams(newTeams);
          } catch (error) {
            addTopAlertCard('ユーザー情報の取得に失敗しました', 'error');
            console.error(error); // eslint-disable-line no-console
          }
        } else {
          setUser(null);
        }
      }
    );
    return unsubscribe;
  }, [addTopAlertCard]);

  const saveRecentTeamId = React.useCallback(
    async (teamId: ITeam['id']) => {
      if (teamId && user?.id) {
        const userRef = doc(firestore, 'users', user.id);
        try {
          await setDoc(userRef, { recentTeamId: teamId }, { merge: true });
          setSelectedTeamId(teamId);
          addMessageObject('チームを変更しました', 'success');
        } catch (error) {
          addMessageObject('チームの変更に失敗しました', 'error');
          console.error(error); // eslint-disable-line no-console
        }
      }
    },
    [addMessageObject, user?.id]
  );

  return (
    <FirebaseAuthContext.Provider
      value={{ user, teams, selectedTeamId, saveRecentTeamId }}
    >
      {children}
    </FirebaseAuthContext.Provider>
  );
};

export const useAuth = () => React.useContext(FirebaseAuthContext);
