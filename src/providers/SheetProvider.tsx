"use client";

import React from "react";
import { useMountedState } from "react-use";
import NewAccountSheet from "@/components/NewAccountSheet";
import EditAccountSheet from "@/components/EditAccountSheet";

import NewCategorySheet from "@/components/NewCategorySheet";
import EditCategorySheet from "@/components/EditCategorySheet";

const SheetProvider = () => {
  const isMounted = useMountedState();

  if (!isMounted) return null;

  return (
    <>
      <NewAccountSheet></NewAccountSheet>
      <EditAccountSheet></EditAccountSheet>

      <NewCategorySheet></NewCategorySheet>
      <EditCategorySheet></EditCategorySheet>
    </>
  );
};

export default SheetProvider;
