import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";

type NavButtonProps = {
  href: string;
  label: string;
  isActive: boolean;
};
const NavButton = ({ href, label, isActive }: NavButtonProps) => {
  return (
    <Button
      asChild
      size={"sm"}
      variant={"outline"}
      className={cn(isActive && "bg-black/10 dark:bg-white/10")}
    >
      <Link href={href}>{label}</Link>
    </Button>
  );
};

export default NavButton;
