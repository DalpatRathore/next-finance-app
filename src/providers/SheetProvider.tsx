"use client";

import React from "react";
import NewAccountSheet from "@/components/NewAccountSheet";
import { useMountedState } from "react-use";
import EditAccountSheet from "@/components/EditAccountSheet";

const SheetProvider = () => {
  const isMounted = useMountedState();

  if (!isMounted) return null;

  return (
    <>
      <NewAccountSheet></NewAccountSheet>
      <EditAccountSheet></EditAccountSheet>
    </>
  );
};

export default SheetProvider;
