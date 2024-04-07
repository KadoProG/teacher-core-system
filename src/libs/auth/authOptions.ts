import { AuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

const allowedEmailString = process.env.ALLOWED_EMAILS;

export const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async session({ session }) {
      // 許可するメールアドレスのリスト
      const allowedEmails = allowedEmailString?.split(',') ?? [];
      // セッションに独自の情報を追加
      session.user.permitted =
        !!session.user.email && allowedEmails.includes(session.user.email);

      return session;
    },
  },
};
