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

          const userInfo = await axios.get(
            `https://shoes-shop-strapi.herokuapp.com/api/users/${response.data.user.id}?populate=avatar`,
            {
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${response.data.jwt}`,
              },
            },
          );

          return {
            ...response.data.user,
            access_token: response.data.jwt,
            image: userInfo.data.avatar?.url,
          };
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
      session.user.accessToken = token.accessToken;
      session.user.firstName = token.firstName;
      session.user.lastName = token.lastName;
      session.user.image = token.image;

      return session;
    },
    jwt({token, account, user, trigger, session}) {
      if (account) {
        token.accessToken = user.access_token;
        token.id = user.id;
        token.username = user.username;
        token.firstName = user.firstName || '';
        token.lastName = user.lastName || '';
        token.image = user.image;
      }

      if (trigger === 'update') {
        token.firstName = session.user.firstName || '';
        token.lastName = session.user.lastName || '';
        token.image = session.user.image || null;
      }

      return token;
    },
  },
  pages: {
    signIn: '/auth/sign-in',
    error: '/404',
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
