import CredentialsProvider from "next-auth/providers/credentials";
import NextAuth from "next-auth/next";

const BASE_URL =
  process.env.NODE_ENV == "development"
    ? "http://localhost:3000"
    : process.env.NEXTAUTH_URL;

export default async function auth(req, res) {
  const providers = [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: "Credentials",
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        // You need to provide your own logic here that takes the credentials
        // submitted and returns either a object representing a user or value
        // that is false/null if the credentials are invalid.
        // e.g. return { id: 1, name: 'J Smith', email: 'jsmith@example.com' }
        // You can also use the `req` object to obtain additional parameters
        // (i.e., the request IP address)
        const res = await fetch(`${BASE_URL}/api/validate`, {
          method: "POST",
          body: JSON.stringify(credentials),
          headers: { "Content-Type": "application/json" },
        });
        const user = await res.json();

        // If no error and we have user data, return it
        if (res.ok && user.ok) {
          return user;
        }
        // Return null if user data could not be retrieved
        return null;
      },
    }),
  ];

  const callbacks = {
    async jwt({ token, user }) {
      // Persist the OAuth access_token and or the user id to the token right after signin
      if (user) {
        token.user = user.user;
      }
      return token;
    },
    async session({ session, token, user }) {
      // Send properties to the client, like an access_token and user id from a provider.
      session.accessToken = token.accessToken;
      session.user = token.user;

      return session;
    },
  };

  const pages = {
    signIn: "/login",
  };

  return await NextAuth(req, res, {
    providers,
    callbacks,
    pages,
  });
}
