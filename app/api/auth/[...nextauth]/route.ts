import { prisma } from '@/prisma/prisma-client';
import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';

const handler = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: { label: 'Email', type: 'email', required: true },
        password: { label: 'Password', type: 'password', required: true },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email,
          },
        });

        if (!user) {
          return null;
        }

        if (user && typeof user === 'object') {
          if (user.email !== credentials.email) {
            return null;
          }

          if (user.password !== credentials.password) {
            return null;
          }
        }

        if (user && user.password === credentials.password) {
          return user as any;
        }
      },
    }),
  ],
  pages: {
    signIn: '/login',
  },
});

export { handler as GET, handler as POST };
