import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import useNewTransaction from "@/hooks/transactions/useNewTransaction";
import TransactionForm from "@/components/forms/TransactionForm";
import { insertTranactionSchema } from "@/db/schema";
import { z } from "zod";
import { useCreateTransaction } from "@/hooks/transactions/useCreateTransaction";
import { useGetCategories } from "@/hooks/categories/useGetCategories";
import { useCreateCategory } from "@/hooks/categories/useCreateCategory";
import { useGetAccounts } from "@/hooks/accounts/useGetAccounts";
import { useCreateAccount } from "@/hooks/accounts/useCreateAccount";
import { Loader2Icon } from "lucide-react";

const formSchema = insertTranactionSchema.omit({
  id: true,
});
type FormValues = z.input<typeof formSchema>;
const NewTransactionSheet = () => {
  const { isOpen, onClose } = useNewTransaction();
  const createMutation = useCreateTransaction();
  const categoryQuery = useGetCategories();
  const categoryMutation = useCreateCategory();

  const onCreateCategory = (name: string) =>
    categoryMutation.mutate({
      name,
    });
  const categoryOptions = (categoryQuery.data ?? []).map(category => ({
    label: category.name,
    value: category.id,
  }));

  const accountQuery = useGetAccounts();
  const accountMutation = useCreateAccount();

  const onCreateAccount = (name: string) =>
    accountMutation.mutate({
      name,
    });
  const accountOptions = (accountQuery.data ?? []).map(account => ({
    label: account.name,
    value: account.id,
  }));
  const isPending =
    createMutation.isPending ||
    categoryMutation.isPending ||
    accountMutation.isPending;

  const isLoading = categoryQuery.isLoading || accountQuery.isLoading;

  const onSubmit = async (values: FormValues) => {
    // console.log(values);
    createMutation.mutate(values, {
      onSuccess: () => {
        onClose();
      },
    });
  };
  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>New Transaction</SheetTitle>
          <SheetDescription>
            Create a new transaction to track your transactions.
          </SheetDescription>
        </SheetHeader>
        {isLoading ? (
          <div className="absolute inset-0 flex items-center justify-center">
            <Loader2Icon className="size-4 text-muted-foreground animate-spin" />
          </div>
        ) : (
          <TransactionForm
            onSubmit={onSubmit}
            disabled={isPending}
            categoryOptions={categoryOptions}
            onCreateCategory={onCreateCategory}
            accountOptions={accountOptions}
            onCreateAccount={onCreateAccount}
          ></TransactionForm>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default NewTransactionSheet;
