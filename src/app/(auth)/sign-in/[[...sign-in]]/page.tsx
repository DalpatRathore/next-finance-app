import { SignIn, ClerkLoaded, ClerkLoading } from "@clerk/nextjs";
import { Loader2 } from "lucide-react";
import Image from "next/image";

export default function Page() {
  return (
    <div className="h-full grid grid-cols-1 lg:grid-cols-2 p-5">
      <div className="w-full flex items-center justify-center">
        <ClerkLoaded>
          <SignIn path="/sign-in" />
        </ClerkLoaded>
        <ClerkLoading>
          <div className="w-full h-96 flex items-center justify-center">
            <Loader2 className="animate-spin text-muted-foreground"></Loader2>
          </div>
        </ClerkLoading>
      </div>
      <div className="h-full w-full hidden lg:flex items-center justify-center">
        <div className="w-full max-w-sm drop-shadow-2xl shadow border rounded-full p-10">
          <Image
            src="logo.svg"
            alt="Logo"
            className="h-auto w-full"
            width={100}
            height={100}
          />
        </div>
      </div>
    </div>
  );
}
