"use client";

import React from "react";
import NewAccountSheet from "@/components/forms/NewAccountSheet";
import { useMountedState } from "react-use";

const SheetProvider = () => {
  const isMounted = useMountedState();

  if (!isMounted) return null;

  return (
    <>
      <NewAccountSheet></NewAccountSheet>
    </>
  );
};

export default SheetProvider;
