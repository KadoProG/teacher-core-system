'use client';

import { doc, getDoc, setDoc } from '@firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import React from 'react';
import { useTopAlertCard } from '@/components/commons/feedback/TopAlertCardContext';
import { firebaseAuth, firestore } from '@/libs/firebase/firebase';

type UserContextType = IUser | null | undefined;

const FirebaseAuthContext = React.createContext<{
  user: UserContextType;
  teams: ITeam[];
  selectedTeamId: string | undefined;
  setSelectedTeamId: (teamId: string | undefined) => void;
}>({
  user: undefined,
  teams: [],
  selectedTeamId: undefined,
  setSelectedTeamId: () => {},
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

  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      firebaseAuth,
      async (firebaseUser) => {
        if (firebaseUser) {
          const ref = doc(firestore, 'users', firebaseUser.uid);

          try {
            const userDoc = await getDoc(ref);

            if (userDoc.exists()) {
              const appUser = userDoc.data() as IUser;
              setUser(appUser);

              // ユーザー情報が更新されている場合は更新
              if (
                appUser.name !== firebaseUser.displayName ||
                appUser.email !== firebaseUser.email ||
                appUser.photoURL !== firebaseUser.photoURL
              ) {
                await setDoc(ref, {
                  ...appUser,
                  name: firebaseUser.displayName,
                  email: firebaseUser.email,
                  photoURL: firebaseUser.photoURL,
                });
              }

              const teamIds = appUser.teamIds;

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
            } else {
              // ユーザーが存在しない場合は新規作成
              const appUser: IUser = {
                id: firebaseUser.uid,
                name: firebaseUser.displayName!,
                email: firebaseUser.email!,
                photoURL: firebaseUser.photoURL!,
                teamIds: [],
              };

              await setDoc(ref, appUser).then(() => {
                setUser(appUser);
              });
            }
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

  return (
    <FirebaseAuthContext.Provider
      value={{ user, teams, selectedTeamId, setSelectedTeamId }}
    >
      {children}
    </FirebaseAuthContext.Provider>
  );
};

export const useAuth = () => React.useContext(FirebaseAuthContext);
