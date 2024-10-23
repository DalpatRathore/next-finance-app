"use client";

import React from "react";
import { useMountedState } from "react-use";
import NewAccountSheet from "@/components/sheets/NewAccountSheet";
import EditAccountSheet from "@/components/sheets/EditAccountSheet";

import NewCategorySheet from "@/components/sheets/NewCategorySheet";
import EditCategorySheet from "@/components/sheets/EditCategorySheet";

import NewTransactionSheet from "@/components/sheets/NewTransactionSheet";
import EditTransactionSheet from "@/components/sheets/EditTransactionSheet";

const SheetProvider = () => {
  const isMounted = useMountedState();

  if (!isMounted) return null;

  return (
    <>
      <NewAccountSheet></NewAccountSheet>
      <EditAccountSheet></EditAccountSheet>

      <NewCategorySheet></NewCategorySheet>
      <EditCategorySheet></EditCategorySheet>

      <EditTransactionSheet></EditTransactionSheet>
      <NewTransactionSheet></NewTransactionSheet>
    </>
  );
};

export default SheetProvider;
