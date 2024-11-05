"use client";
import qs from "query-string";
import { useGetAccounts } from "@/hooks/accounts/useGetAccounts";
import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useGetSummary } from "@/hooks/summary/useGetSummary";
import { Loader2Icon } from "lucide-react";
import { Button } from "./ui/button";

const AccountFilter = () => {
  const { data: accounts, isLoading: isLoadingAccounts } = useGetAccounts();

  const { data: summary, isLoading: isLoadingSummary } = useGetSummary();
  const pathname = usePathname();
  const router = useRouter();
  const params = useSearchParams();
  const accountId = params.get("accountId") || "all";
  const from = params.get("from") || "";
  const to = params.get("to") || "";

  const onChange = (newValue: string) => {
    const query = {
      accountId: newValue,
      from,
      to,
    };
    if (newValue === "all") {
      query.accountId = "";
    }
    const url = qs.stringifyUrl(
      {
        url: pathname,
        query,
      },
      { skipEmptyString: true, skipNull: true }
    );
    router.push(url);
  };
  if (isLoadingAccounts) {
    return (
      <Button variant={"outline"} className="w-56">
        <Loader2Icon className="animate-spin"></Loader2Icon>
      </Button>
    );
  }
  return (
    <Select
      value={accountId}
      onValueChange={onChange}
      disabled={isLoadingAccounts || isLoadingSummary}
    >
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Select Account"></SelectValue>
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">All accounts</SelectItem>
        {accounts?.map(account => (
          <SelectItem key={account.id} value={account.id}>
            {account.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default AccountFilter;
