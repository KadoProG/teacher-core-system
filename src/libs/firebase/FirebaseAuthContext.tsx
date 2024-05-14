'use client';

import { doc, getDoc, setDoc } from '@firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';
import { useTopAlertCard } from '@/components/commons/feedback/TopAlertCardContext';
import { firebaseAuth, firestore } from '@/libs/firebase/firebase';

type UserContextType = IUser | null | undefined;

const FirebaseAuthContext = createContext<UserContextType>(undefined);

export const FirebaseAuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserContextType>();
  const { addTopAlertCard } = useTopAlertCard();

  useEffect(() => {
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
            } else {
              // ユーザーが存在しない場合は新規作成
              const appUser: IUser = {
                id: firebaseUser.uid,
                name: firebaseUser.displayName!,
                email: firebaseUser.email!,
                photoURL: firebaseUser.photoURL!,
                teams: [],
              };

              await setDoc(ref, appUser).then(() => {
                setUser(appUser);
              });
            }
          } catch (error) {
            addTopAlertCard('ユーザー情報の取得に失敗しました', 'error');
            // eslint-disable-next-line no-console
            console.error(error);
          }
        } else {
          setUser(null);
        }
      }
    );
    return unsubscribe;
  }, [addTopAlertCard]);

  return (
    <FirebaseAuthContext.Provider value={user}>
      {children}
    </FirebaseAuthContext.Provider>
  );
};

export const useAuth = () => useContext(FirebaseAuthContext);
