"use client";
import { navRoutes } from "@/constants/navRoutes";
import React from "react";
import NavButton from "./NavButton";
import { usePathname } from "next/navigation";

const Navigation = () => {
  const pathname = usePathname();
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
