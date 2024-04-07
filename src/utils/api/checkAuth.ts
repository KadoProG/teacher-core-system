import { getServerSession } from 'next-auth';
import { authOptions } from '@/libs/auth/authOptions';

export const checkAuth = async () => {
  const session = await getServerSession(authOptions);
  if (!session?.user.permitted) {
    return false;
  }
  return true;
};
