import NextAuth, { User } from "next-auth";

declare module "next-auth" {
  interface User {
    user: {
      name: string;
      role: string;
      email: string;
    };
    token: string;
  }
  interface Session {
    user: {
      name: string;
      role: string;
      email: string;
    };
    token: jwt;
  }
}
