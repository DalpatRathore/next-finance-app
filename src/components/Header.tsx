import React from "react";
import {
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
  ClerkLoaded,
  ClerkLoading,
} from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";
import ThemeToggle from "./ThemeToggle";
import { Loader2Icon } from "lucide-react";
import Navigation from "./navigation/Navigation";

const Header = () => {
  return (
    <header className="border-b">
      <div className="mx-auto max-w-screen-xl p-2 md:p-4 flex items-center justify-between ">
        <div className="flex items-center justify-center">
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
        </div>
        <div className="flex items-center justify-center gap-x-4">
          <Navigation></Navigation>
          <div className="flex items-center gap-x-2">
            <ClerkLoading>
              <Button variant="outline" size="icon" className="rounded-full">
                <Loader2Icon className="animate-spin text-muted-foreground" />
              </Button>
            </ClerkLoading>
            <ClerkLoaded>
              <SignedIn>
                <Button
                  variant={"outline"}
                  size={"icon"}
                  className="rounded-full"
                >
                  <UserButton />
                </Button>
              </SignedIn>
            </ClerkLoaded>
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
