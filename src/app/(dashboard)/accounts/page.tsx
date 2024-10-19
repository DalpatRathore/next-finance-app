"use client";
import { DataTable } from "@/components/DataTable";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import useNewAccount from "@/hooks/useNewAccount";
import { Loader2Icon, PlusCircleIcon } from "lucide-react";
import { columns } from "@/app/(dashboard)/accounts/columns";
import { useGetAccounts } from "@/hooks/useGetAccounts";
import { Skeleton } from "@/components/ui/skeleton";
import { useBulkDeleteAccounts } from "@/hooks/useBulkDeleteAccounts";

const AccountsPage = () => {
  const { onOpen } = useNewAccount();

  const accountsQuery = useGetAccounts();
  const accounts = accountsQuery.data || [];

  const deleteAccounts = useBulkDeleteAccounts();
  const isDisabled = accountsQuery.isLoading || deleteAccounts.isPending;

  if (accountsQuery.isLoading) {
    return (
      <div className="max-w-screen-2xl mx-auto w-full px-5 lg:px-10">
        <Card className="">
          <CardHeader className="gap-y-2 lg:flex-row lg:items-center justify-between">
            <CardTitle className="text-xl text-center line-clamp-1 text-muted-foreground">
              Accounts Dashboard
            </CardTitle>

            <Skeleton className="w-full lg:w-32 h-10"></Skeleton>
          </CardHeader>
          <CardContent>
            <div className="h-80 w-full flex items-center justify-center">
              <Loader2Icon className="size-6 animate-spin" />
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-screen-2xl mx-auto w-full px-5 lg:px-10">
      <Card className="">
        <CardHeader className="gap-y-2 lg:flex-row lg:items-center justify-between">
          <CardTitle className="text-xl text-center line-clamp-1">
            Accounts Dashboard
          </CardTitle>
          <Button onClick={onOpen}>
            <PlusCircleIcon className="size-4" /> Add New
          </Button>
        </CardHeader>
        <CardContent>
          <DataTable
            columns={columns}
            data={accounts}
            filterKey="name"
            onDelete={row => {
              const ids = row.map(r => r.original.id.toString());
              console.log(typeof ids);
              deleteAccounts.mutate({ json: { ids: ids } });
            }}
            disabled={isDisabled}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default AccountsPage;
