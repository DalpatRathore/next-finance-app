"use client";
import { DataTable } from "@/components/DataTable";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import useNewTransaction from "@/hooks/transactions/useNewTransaction";
import { Loader2Icon, PlusCircleIcon } from "lucide-react";
import { columns } from "@/app/(dashboard)/transactions/columns";
import { useGetTransactions } from "@/hooks/transactions/useGetTransactions";
import { Skeleton } from "@/components/ui/skeleton";
import { useBulkDeleteTransactions } from "@/hooks/transactions/useBulkDeleteTransactions";
import { useState } from "react";
import UploadButton from "./UploadButton";
import ImportCard from "./ImportCard";

enum VARIANTS {
  LIST = "LIST",
  IMPORT = "IMPORT",
}
const INITIAL_IMPORT_RESULTS = {
  data: [],
  errors: [],
  meta: {},
};

const TransactionsPage = () => {
  const [variants, setVariants] = useState<VARIANTS>(VARIANTS.LIST);
  const [importedResults, setImportedResults] = useState(
    INITIAL_IMPORT_RESULTS
  );
  const onUpload = (results: typeof INITIAL_IMPORT_RESULTS) => {
    // console.log(results);
    setImportedResults(results);
    setVariants(VARIANTS.IMPORT);
  };

  const onCancelImport = () => {
    setImportedResults(INITIAL_IMPORT_RESULTS);
    setVariants(VARIANTS.LIST);
  };
  const newTransaction = useNewTransaction();

  const transactionsQuery = useGetTransactions();
  const transactions = transactionsQuery.data || [];

  const deleteTransactions = useBulkDeleteTransactions();
  const isDisabled =
    transactionsQuery.isLoading || deleteTransactions.isPending;

  if (transactionsQuery.isLoading) {
    return (
      <div className="max-w-screen-2xl mx-auto w-full px-5 lg:px-10">
        <Card className="">
          <CardHeader className="gap-y-2 lg:flex-row lg:items-center justify-between">
            <CardTitle className="text-xl text-center line-clamp-1 text-muted-foreground">
              Transactions Dashboard
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

  if (variants === VARIANTS.IMPORT) {
    return (
      <>
        <ImportCard
          onCancel={onCancelImport}
          onSubmit={() => {}}
          data={importedResults.data}
        ></ImportCard>
      </>
    );
  }

  return (
    <div className="max-w-screen-2xl mx-auto w-full px-5 lg:px-10">
      <Card className="">
        <CardHeader className="gap-y-2 lg:flex-row lg:items-center justify-between">
          <CardTitle className="text-xl text-center line-clamp-1">
            Transactions History
          </CardTitle>
          <div className="flex items-center justify-center gap-x-2">
            <Button onClick={newTransaction.onOpen}>
              <PlusCircleIcon className="size-4" /> Add New
            </Button>
            <UploadButton onUpload={onUpload}></UploadButton>
          </div>
        </CardHeader>
        <CardContent>
          <DataTable
            columns={columns}
            data={transactions}
            filterKey="payee"
            onDelete={row => {
              const ids = row.map(r => r.original.id.toString());
              deleteTransactions.mutate({ json: { ids: ids } });
            }}
            disabled={isDisabled}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default TransactionsPage;
