import axios from 'axios';
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        identifier: {label: 'Username', type: 'text', placeholder: 'jsmith'},
        password: {label: 'Password', type: 'password'},
      },
      async authorize(credentials, req) {
        try {
          const response = await axios.post(
            'https://shoes-shop-strapi.herokuapp.com/api/auth/local',
            credentials,
            {
              headers: {'Content-Type': 'application/json'},
            },
          );

          return {...response.data.user, access_token: response.data.jwt};
        } catch {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    session({session, token}) {
      session.user.id = token.id;
      session.user.username = token.username;
      session.user.name = token.name;

      return session;
    },
    jwt({token, account, user}) {
      if (account) {
        token.accessToken = user.access_token;
        token.id = user.id;
        token.username = user.username;
        token.name = user.firstName
          ? user.firstName + ' '
          : '' + (user.lastName || '');
      }
      return token;
    },
  },
  pages: {
    signIn: '/auth/signIn',
  },
  session: {
    strategy: 'jwt',
  },
  secret: process.env.NEXTAUTH_SECRET,
});
