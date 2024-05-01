import {
  GoogleAuthProvider,
  signInWithPopup,
  UserCredential,
  signOut,
} from 'firebase/auth';
import { firebaseAuth } from '@/libs/firebase/firebase';

export const login = (): Promise<UserCredential> => {
  const provider = new GoogleAuthProvider();
  return signInWithPopup(firebaseAuth, provider);
};

export const logout = (): Promise<void> => signOut(firebaseAuth);
