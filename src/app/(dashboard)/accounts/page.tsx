"use client";
import { columns } from "@/app/(dashboard)/accounts/columns";
import { DataTable } from "@/components/DataTable";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import useNewAccount from "@/hooks/useNewAccount";
import { PlusCircleIcon } from "lucide-react";

const AccountsPage = () => {
  const { onOpen } = useNewAccount();
  const data = [
    {
      id: "728ed52f",
      amount: 100,
      status: "pending",
      email: "m@example.com",
    },
    {
      id: "728ed52f",
      amount: 100,
      status: "pending",
      email: "m@example.com",
    },
    {
      id: "728ed52f",
      amount: 100,
      status: "pending",
      email: "m@example.com",
    },
    {
      id: "728ed52f",
      amount: 100,
      status: "pending",
      email: "m@example.com",
    },
    {
      id: "728ed52f",
      amount: 100,
      status: "pending",
      email: "m@example.com",
    },
  ];
  return (
    <div className="max-w-screen-2xl mx-auto w-full p-5 lg:p-10">
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
            data={data}
            filterKey="email"
            onDelete={() => {}}
            disabled={false}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default AccountsPage;
