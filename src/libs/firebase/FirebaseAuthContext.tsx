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
import { firebaseAuth, firestore } from '@/libs/firebase/firebase';

type UserContextType = IUser | null | undefined;

const FirebaseAuthContext = createContext<UserContextType>(undefined);

export const FirebaseAuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserContextType>();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      firebaseAuth,
      async (firebaseUser) => {
        if (firebaseUser) {
          const ref = doc(firestore, `users/${firebaseUser.uid}`);
          const snap = await getDoc(ref);

          if (snap.exists()) {
            const appUser = (await getDoc(ref)).data() as IUser;
            setUser(appUser);

            if (
              appUser.name !== firebaseUser.displayName ||
              appUser.email !== firebaseUser.email ||
              appUser.photoURL !== firebaseUser.photoURL
            ) {
              setDoc(ref, { ...appUser, photoURL: firebaseUser.photoURL });
            }
          } else {
            const appUser: IUser = {
              id: firebaseUser.uid,
              name: firebaseUser.displayName!,
              email: firebaseUser.email!,
              photoURL: firebaseUser.photoURL!,
              teams: [],
            };

            setDoc(ref, appUser).then(() => {
              setUser(appUser);
            });
          }
        } else {
          setUser(null);
        }
      }
    );
    return unsubscribe;
  }, []);

  return (
    <FirebaseAuthContext.Provider value={user}>
      {children}
    </FirebaseAuthContext.Provider>
  );
};

export const useAuth = () => useContext(FirebaseAuthContext);
