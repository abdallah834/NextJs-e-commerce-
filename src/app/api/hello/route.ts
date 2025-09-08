// to create an api we create a foleder named api at the app directory then we create endpoint in that case it's the hello folder and then we create a file named route.tsx "localhost:300/api/hello".

// usually the best use for the api folder using Next.js is to create a fullstack webApp.

// api folders in the app directory can be used to make our API connection privat and no accessable by users.
import { NextResponse } from "next/server";

export async function GET() {
  //   const data = await fetch("");
  //   const response = await data.json();
  const data = {
    message: "success",
    error: false,
    data: {
      name: "kevin hart",
      age: "too fucking old",
      email: "admin@admin.com",
    },
  };
  return NextResponse.json(data);
}
export async function POST() {
  //   const data = await fetch("");
  //   const response = await data.json();
  const data = {
    message: "success",
    error: false,
    data: {
      name: "kevin hart",
      age: "too fucking old",
      email: "admin@admin.com",
    },
  };
  return NextResponse.json(data);
}
