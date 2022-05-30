import NextAuth from 'next-auth'
import CredentialProvider from 'next-auth/providers/credentials';
import { redirect } from 'next/dist/server/api-utils';
import { DBAdapter } from '../../../services/database';



export default NextAuth({
  providers: [
    CredentialProvider({
      name: 'credentials',
      id: 'credentials',
      type: 'credentials',
      credentials: {
        username: {
          label: 'Username',
          type: 'text',
          placeholder: 'Enter username'
        },
        password: {
          label: 'Password',
          type: 'password',
          placeholder: 'Enter password'
        }
      },
      async authorize(credentials) {
        if (credentials) {
          const _user = await DBAdapter.getUser(credentials.username);
          const { password, ...user } = _user;
          if (password === credentials.password) {
            return user
          };
        }
        return null
      }
    })
  ],
  callbacks: {
    redirect: ({ baseUrl }) => {
      return Promise.resolve(baseUrl);
    },
    async jwt({ token, user }) {

      if (user) {
        token.user = user
      }
      return Promise.resolve(token);
    },
    async session({ session, token }) {
      if (token) {
        //@ts-ignore 
        session.user = token.user
      }
      return Promise.resolve(session);
    }
  },
});
