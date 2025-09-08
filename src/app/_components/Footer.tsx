"use client";

import { Button } from "@/components/ui/button";
import { Icon } from "@iconify-icon/react/dist/iconify.mjs";
import Link from "next/link";

export default function Footer() {
  return (
    <>
      <footer className="bg-zinc-100 flex flex-col justify-center items-center mt-10 py-15">
        <div className="newsletter-container bg-black text-white flex flex-col md:flex-row justify-between gap-30 p-10 rounded-3xl w-xs sm:w-md md:w-2xl md:mx-4 lg:w-4xl xl:w-5xl 2xl:w-6xl ">
          <span className="text-3xl lg:text-4xl font-bold mb-6 lg:mb-0 lg:w-1/2 uppercase tracking-wider">
            Stay up to date about our latest offers
          </span>
          <div className="footer-input-container flex flex-col gap-5 justify-center">
            <input
              type="text"
              className="bg-white text-black rounded-md px-1 py-2 placeholder:text-black/65 placeholder:font-semibold placeholder:ps-1.5"
              placeholder="Enter your email address"
            />
            <Button className="bg-white text-black cursor-pointer hover:bg-zinc-200 px-20 rounded-xl">
              Subscribe to newsletter
            </Button>
          </div>
        </div>
        <div className="container mx-auto flex flex-col gap-4 md:flex-row justify-between mt-12 border-t-2 pt-8 w-xs sm:w-xl md:w-2xl lg:w-4xl xl:w-5xl 2xl:w-6xl">
          <span className="text-center">
            Route.co © 2000-2025, All Rights Reserved
          </span>
          <div className="socials-container *:text-3xl flex justify-center items-center gap-3">
            <Link href={"/"} className="hover:*:scale-110">
              <Icon
                icon="skill-icons:instagram"
                className="transition duration-300"
              />
            </Link>
            <Link href={"/"} className="hover:*:scale-110">
              <Icon
                icon="akar-icons:facebook-fill"
                className="text-[#0060d9] transition duration-300"
              />
            </Link>
            <Link href={"/"} className="hover:*:scale-110">
              <Icon icon="bi:twitter-x" className="transition duration-300" />
            </Link>
            <Link href={"/"} className="hover:*:scale-110">
              <Icon
                icon="logos:youtube-icon"
                className="transition duration-300"
              />
            </Link>
            <Link href={"/"} className="hover:*:scale-110">
              <Icon
                icon="skill-icons:linkedin"
                className="transition duration-300"
              />
            </Link>
          </div>
        </div>
      </footer>
    </>
  );
}
