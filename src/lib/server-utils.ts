"use server";
// to decode a session token we use decode from JWT
import { decode } from "next-auth/jwt";
import { cookies } from "next/headers";

export async function getSessionToken() {
  // getting cookies using next/headers
  // cookies has to be used within a server component to be accessed.
  // in production the next-auth cookies session changes to __secure-next....
  const sessionToken = (await cookies()).get(
    "__Secure-next-auth.session-token"
  )?.value;
  const decodedToken = await decode({
    token: sessionToken,
    // the ! means that it won't return undefined to solve an undefined error
    // make sure secret key env variable is accurate
    secret: process.env.NEXTAUTH_SECRET!,
  });
  // the token has to be returned as a string
  return decodedToken?.token as string;
}
