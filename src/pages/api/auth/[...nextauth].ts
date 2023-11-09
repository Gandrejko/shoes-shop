import axios from 'axios';
import {NextApiRequest, NextApiResponse} from 'next';
import NextAuth, {AuthOptions} from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import {parseCookies, setCookie} from 'nookies';

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      id: 'credentials',
      name: 'Credentials',
      credentials: {
        identifier: {label: 'Username', type: 'text', placeholder: 'jsmith'},
        password: {label: 'Password', type: 'password'},
        rememberMe: {label: 'Remember Me', type: 'checkbox'},
      },
      async authorize(credentials, req) {
        try {
          const response = await axios.post(
            'https://shoes-shop-strapi.herokuapp.com/api/auth/local',
            {
              identifier: credentials?.identifier,
              password: credentials?.password,
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
      session.user.accessToken = token.accessToken;

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
    signIn: '/auth/sign-in',
  },
  session: {
    strategy: 'jwt',
  },
  secret: process.env.NEXTAUTH_SECRET,
};

export default async function auth(req: NextApiRequest, res: NextApiResponse) {
  const cookies = parseCookies({req});

  let maxAge = 1 * 24 * 60 * 60; // one day in seconds
  const thirtyFourDays = 30 * 24 * 60 * 60; // thirty days in seconds

  if (cookies['rememberMe']) {
    maxAge = cookies['rememberMe'] == 'true' ? thirtyFourDays : maxAge;
  } else if (req.body.rememberMe) {
    maxAge = req.body.rememberMe == 'true' ? thirtyFourDays : maxAge;

    setCookie({res}, 'rememberMe', req.body.rememberMe, {
      maxAge,
      path: '/',
    });
  }

  return await NextAuth(req, res, {
    ...authOptions,
    session: {maxAge},
  });
}
