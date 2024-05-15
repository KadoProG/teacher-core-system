'use client';

import { useRouter } from 'next/navigation';
import React from 'react';
import { useAuth } from '@/libs/firebase/FirebaseAuthContext';

const AuthenticatedLayout = (props: { children: React.ReactNode }) => {
  const { user } = useAuth();
  const router = useRouter();

  React.useEffect(() => {
    if (user === null) {
      router.push('/');
    }
  }, [router, user]);

  return props.children;
};

export default AuthenticatedLayout;
