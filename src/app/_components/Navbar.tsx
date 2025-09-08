"use client";

import { Icon } from "@iconify-icon/react";
import Link from "next/link";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetClose,
  SheetTrigger,
} from "@/components/ui/sheet";
import { DialogTitle } from "@radix-ui/react-dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";
import { Loader2Icon } from "lucide-react";
import { useCart } from "../(context)/CartContextProvider";
export default function Navbar() {
  const { cartProductsAmount } = useCart();

  // useSession is used to get if current user is authenticated or not
  const { status, data } = useSession();
  async function handleSignOut() {
    await signOut({ callbackUrl: "/auth/login" });
  }
  return (
    <>
      <nav className="flex justify-between items-center gap-13 px-18 py-6 border-b-1 border-b-black/30 bg-linear-200 from-black from-50% via-zinc-500 via-70% to-black to-96% *:text-white">
        <Link
          href={"/"}
          className="hover:text-zinc-400 transition duration-300"
        >
          <span className="uppercase text-2xl font-bold">Route.co</span>
        </Link>
        <div className="hidden links-container lg:flex gap-5 font-[650] tracking-wider text-zinc-600 *:hover:text-zinc-400 *:transition *:duration-300">
          {/******** Shop *******/}
          <Link href={"/"}>
            <span>Shop</span>
          </Link>
          {/******** Categories *******/}
          <Link href={"/categories"}>
            <span>Categories</span>
          </Link>
          {/******** Wishlist *******/}
          <Link href={"/wishlist"}>
            <span>Wishlist</span>
          </Link>
        </div>
        <div className="flex gap-3 items-center">
          {/******************* cart & Sign in ******************/}
          <div className="flex gap-5 justify-center items-center">
            <Link href={"/cart"} className="relative">
              <Icon icon="carbon:shopping-cart" className="text-3xl" />
              {cartProductsAmount > 0 && (
                <div className="bg-red-500 flex justify-center items-center rounded-full size-5 absolute top-[-12] right-[-11]">
                  <span className="me-[1.1px]">{cartProductsAmount}</span>
                </div>
              )}
            </Link>
            {status === "loading" ? (
              <Loader2Icon className="animate-spin" />
            ) : status === "authenticated" ? (
              <button
                className="hover:*:bg-zinc-200 hidden lg:block cursor-pointer"
                onClick={handleSignOut}
              >
                <span className="bg-white text-black py-1 px-4 block rounded-lg ms-2 font-semibold transition-all duration-300 active:scale-95">
                  Sign out
                </span>
              </button>
            ) : (
              <Link
                href={"/auth/login"}
                className="hover:*:bg-zinc-200 hidden lg:block"
              >
                <span className="bg-white text-black py-1 px-4 block rounded-lg ms-2 font-semibold transition-all duration-300 active:scale-95">
                  Sign in
                </span>
              </Link>
            )}
          </div>
          <Sheet>
            <SheetTrigger>
              <Icon
                icon="flowbite:bars-from-left-outline"
                className="text-white text-4xl cursor-pointer lg:hidden"
              />
            </SheetTrigger>
            <SheetContent>
              <VisuallyHidden>
                <DialogTitle>Menu bar</DialogTitle>
              </VisuallyHidden>
              <SheetHeader>
                <div>
                  <div className="links-container flex flex-col gap-5 font-[650] tracking-wider text-zinc-600 *:hover:text-zinc-400 *:transition *:duration-300 relative top-9">
                    {/* ******* Shop ****** */}
                    <SheetClose asChild>
                      <Link href={"/"}>
                        <span>Shop</span>
                      </Link>
                    </SheetClose>
                    {/******** Categories *******/}
                    <SheetClose asChild>
                      <Link href={"/categories"}>
                        <span>Categories</span>
                      </Link>
                    </SheetClose>
                    {/******** Wishlist *******/}
                    <SheetClose asChild>
                      <Link href={"/wishlist"}>
                        <span>Wishlist</span>
                      </Link>
                    </SheetClose>
                    {/******** sign-in|out *******/}
                    <SheetClose asChild>
                      {status === "loading" ? (
                        <Loader2Icon className="animate-spin" />
                      ) : status === "authenticated" ? (
                        <button
                          className="block lg:hidden cursor-pointer"
                          onClick={handleSignOut}
                        >
                          <span className="py-1 block rounded-lg transition-all duration-300 text-start">
                            Sign out
                          </span>
                        </button>
                      ) : (
                        <Link href={"/auth/login"} className="block lg:hidden">
                          <span className="py-1 block rounded-lg transition-all duration-300 text-start">
                            Sign in
                          </span>
                        </Link>
                      )}
                    </SheetClose>
                  </div>
                </div>
              </SheetHeader>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </>
  );
}
