'use client';

import { useRouter } from 'next/navigation';
import React from 'react';
import { LoadingContainer } from '@/components/commons/layout/LoadingContainer';
import { useAuth } from '@/libs/firebase/FirebaseAuthContext';

const AuthenticatedLayout = (props: { children: React.ReactNode }) => {
  const user = useAuth();
  const router = useRouter();

  React.useEffect(() => {
    if (user === null) {
      router.push('/');
    }
  }, [router, user]);

  return (
    <LoadingContainer isLoading={!user}>{props.children}</LoadingContainer>
  );
};

export default AuthenticatedLayout;
