// lib/auth.ts 작성(example)
import NextAuth from 'next-auth';
import Google from 'next-auth/providers/google';
import Github from 'next-auth/providers/github';
export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  providers: [Google, Github],
  secret: process.env.AUTH_SECRET as string,
});
