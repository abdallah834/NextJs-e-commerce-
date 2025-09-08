import { getToken } from "next-auth/jwt";
import { NextResponse, NextRequest } from "next/server";

// protected routing using middleware
// server function components can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  // clg works only in terminal with middleware

  // getting the token from JWT
  const token = await getToken({ req: request });

  if (
    (token && request.nextUrl.href.includes("/auth/login")) ||
    (token && request.nextUrl.href.includes("/auth/register"))
  ) {
    // if there is a token continue going to the specified path
    return NextResponse.redirect(new URL("/", request.url));
  } else if (
    (!token && request.nextUrl.href.includes("/auth/login")) ||
    (!token && request.nextUrl.href.includes("/auth/register"))
  ) {
    // if not redirect to login
    return NextResponse.next();
  } else if (token && request.nextUrl.href.includes("/cart")) {
    return NextResponse.next();
  } else if (!token && request.nextUrl.href.includes("/cart")) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }
}

// the config enables middleware to work on a specified path
export const config = {
  matcher: ["/cart", "/auth/:path*"],
};
