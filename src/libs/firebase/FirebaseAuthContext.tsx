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

interface User {
  id: string;
  name: string;
}

type UserContextType = User | null | undefined;

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
            const appUser = (await getDoc(ref)).data() as User;
            setUser(appUser);
          } else {
            const appUser: User = {
              id: firebaseUser.uid,
              name: firebaseUser.displayName!,
            };

            setDoc(ref, appUser).then(() => {
              setUser(appUser);
            });
          }
        } else {
          setUser(null);
        }

        return unsubscribe;
      }
    );
  }, []);

  return (
    <FirebaseAuthContext.Provider value={user}>
      {children}
    </FirebaseAuthContext.Provider>
  );
};

export const useAuth = () => useContext(FirebaseAuthContext);
