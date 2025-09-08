// we import authOptions that have the provider included
// NextAuth(provider || authOptions) return the data the user typed if they are valid and return a csrFtoken
import { authOptions } from "@/app/auth";
import NextAuth from "next-auth";
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
