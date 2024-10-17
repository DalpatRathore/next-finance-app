"use client";
import { navRoutes } from "@/constants/navRoutes";
import React, { useState } from "react";
import NavButton from "./NavButton";
import { usePathname, useRouter } from "next/navigation";

import { useMedia } from "react-use";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "../ui/button";
import { MenuIcon } from "lucide-react";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const isMobile = useMedia("(max-width:1024px)", false);

  const handleOnClick = (href: string) => {
    router.push(href);
    setIsOpen(false);
  };

  if (isMobile) {
    return (
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button variant="outline" size={"icon"}>
            <MenuIcon className="size-4"></MenuIcon>
          </Button>
        </SheetTrigger>
        <SheetContent side={"left"} className="px-2">
          <aside className="flex flex-col gap-y-2 pt-6">
            {navRoutes.map(route => (
              <Button
                key={route.href}
                variant={route.href === pathname ? "secondary" : "ghost"}
                onClick={() => handleOnClick(route.href)}
                className="w-full flex justify-start"
              >
                {route.label}
              </Button>
            ))}
          </aside>
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <nav className="hidden lg:flex items-center gap-x-2 overflow-x-auto">
      {navRoutes.map(route => (
        <NavButton
          key={route.href}
          href={route.href}
          label={route.label}
          isActive={pathname === route.href}
        ></NavButton>
      ))}
    </nav>
  );
};

export default Navigation;
