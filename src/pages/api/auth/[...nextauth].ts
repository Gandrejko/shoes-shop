import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        identifier: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const res = await fetch(
          "https://shoes-shop-strapi.herokuapp.com/api/auth/local",
          {
            method: "POST",
            body: JSON.stringify(credentials),
            headers: { "Content-Type": "application/json" },
          }
        );
        const data = await res.json();
        if (res.ok && data) {
          return {
            name: data.user.username,
            email: data.user.email,
            id: data.user.id,
          };
        }

        return null;
      },
    }),
  ],
  pages: {
    signIn: "/auth/signIn",
  },
});
