// we create an auth.ts to include the options that are going to be passed to the NextAuth function for cleaner code
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  pages: { signIn: "/auth/login" },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "text",
          placeholder: "example@gmail.com",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "*********",
        },
      },
      // authorize is a function that returns user input and takes the URL user credes go to weather log in or register
      authorize: async (credentials) => {
        const response = await fetch(
          `${process.env.API_BASE_URL}/api/v1/auth/signin`,
          {
            method: "POST",
            // data going to the backend has to be turned to JSON format
            body: JSON.stringify({
              email: credentials?.email,
              password: credentials?.password,
            }),
            // including content type is sometimes mandatory in the headers
            headers: { "Content-Type": "application/json" },
          }
        );
        const data = await response.json();
        // we then make a condition to check if the response to API is ok or not based on that we return data object including the id (mandatory) along with the user info and the token to store them later on using cookies.
        if (response?.ok) {
          // user and data returned are later accessible by the jwt and the session function.
          return { id: "5", user: data?.user, token: data?.token };
        } else {
          throw Error(data?.message || "credentials error");
        }
      },
    }),
  ],

  // after success we use callbacks object to execute code based on success
  // because callbacks waits for API response to execute code inside it it has to be async

  callbacks: {
    async jwt({ token, user }) {
      // integration error causes user here to cause an error the fix to that is to create a ts file called next-auth.d.ts
      // on log in success we ((encrypt)) the user object and the token from API in cookies or token provided by next auth.
      // has to be inside of a condition to check if user is logged in or not so data doesn't return as ((undefined))
      // if resolves an issue where the token gets automatically deleted after being logged in.

      if (user) {
        token.user = user.user;
        token.token = user.token;
        // token has to be returned for changes to take effect
      }
      return token;
    },
    async session({ session, token }) {
      // we use session to later on have access to info on client side including token (encrypted)
      // it's a best practice to not store user's token in the session cookies
      session.user = token.user as {
        name: string;
        email: string;
        role: string;
      };
      return session;
    },
  },
};
