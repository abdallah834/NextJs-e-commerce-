"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function NotFound() {
  return (
    <>
      <div className="flex flex-col justify-center items-center gap-2 min-h-screen">
        <h2 className="text-9xl font-bold text-zinc-700">404</h2>
        <h2 className="font-bold text-red-500 text-4xl">Not Found</h2>
        <p className="text-2xl font-semibold">This page doesn't exist</p>
        <Link href="/" className="mt-4">
          <Button className="cursor-pointer">Return Home</Button>
        </Link>
      </div>
    </>
  );
}
