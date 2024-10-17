import React from "react";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";
import ThemeToggle from "./ThemeToggle";

const Header = () => {
  return (
    <header className="border-b">
      <div className="mx-auto max-w-screen-xl p-2 md:p-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center justify-center gap-2">
            <div className="drop-shadow-sm md:drop-shadow-lg shadow-sm border rounded-full p-1 md:p-2">
              <Image
                src="/logo.svg"
                className="w-10 md:w-12 h-auto "
                alt="logo"
                width={40}
                height={40}
              />
            </div>
            <h1 className="hidden md:flex text-2xl font-bold">Next Finance</h1>
          </Link>

          <div className="flex items-center gap-4">
            <SignedOut>
              <Button variant="outline" asChild>
                <SignInButton />
              </Button>
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>

            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
