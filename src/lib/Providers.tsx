// use client is mandatory because it uses useContext
"use client";
import CartContextProvider from "@/app/(context)/CartContextProvider";
import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";

// in order to have access to the data from the log in API after being stored to use in our app we import SessionProvider to wrap our app
export default function Providers({ children }: { children: ReactNode }) {
  return (
    <SessionProvider>
      <CartContextProvider>{children}</CartContextProvider>
    </SessionProvider>
  );
}
