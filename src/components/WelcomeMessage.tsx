"use client";
import { useUser } from "@clerk/nextjs";
import { FileSpreadsheetIcon, GroupIcon, MailIcon } from "lucide-react";
import React from "react";
import { Skeleton } from "./ui/skeleton";

const WelcomeMessage = () => {
  const { user, isLoaded } = useUser();
  return (
    <div className="w-full max-w-lg space-y-2 mb-4 flex flex-col items-start justify-center">
      <h2 className="text-2xl lg:2xl font-medium flex items-center justify-center">
        Welcome Back
        {isLoaded ? (
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 ml-1 font-bold">
            {user?.firstName} {user?.lastName}
          </span>
        ) : (
          <Skeleton className="h-8 w-60 ml-1 rounded-sm" />
        )}
      </h2>
      <div className="text-sm lg:text-base text-muted-foreground flex items-center justify-start">
        <MailIcon className="size-4 mr-1"></MailIcon>
        {isLoaded ? (
          <p className="ml-1 text-blue-500">
            {user?.emailAddresses[0].emailAddress}
          </p>
        ) : (
          <Skeleton className="h-4 w-80 ml-1 rounded-sm" />
        )}
      </div>
      <p className="text-sm lg:text-base text-muted-foreground flex items-center justify-start">
        <GroupIcon className="size-4 mr-1" />
        This is your Financial Overview Report
      </p>
    </div>
  );
};

export default WelcomeMessage;
