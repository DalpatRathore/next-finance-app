import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import useOpenTransaction from "@/hooks/transactions/useOpenTransaction";
import TransactionForm from "../forms/TransactionForm";
import { z } from "zod";
import { useGetTransaction } from "@/hooks/transactions/useGetTransaction";
import { Loader2Icon } from "lucide-react";
import { useEditTransaction } from "@/hooks/transactions/useEditTransaction";
import { useDeleteTransaction } from "@/hooks/transactions/useDeleteTransaction";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import React from "react";
import { Button } from "../ui/button";
import { insertTranactionSchema } from "@/db/schema";
import { useGetCategories } from "@/hooks/categories/useGetCategories";
import { useCreateCategory } from "@/hooks/categories/useCreateCategory";
import { useGetAccounts } from "@/hooks/accounts/useGetAccounts";
import { useCreateAccount } from "@/hooks/accounts/useCreateAccount";

const formSchema = insertTranactionSchema.omit({
  id: true,
});

type FormValues = z.input<typeof formSchema>;
const EditTransactionSheet = () => {
  const [isOpenDialog, setIsOpenDialog] = React.useState(false);
  const [onConfirm, setOnConfirm] = React.useState<(() => void) | null>(null);
  const { isOpen, onClose, id } = useOpenTransaction();

  const transactionQuery = useGetTransaction(id);
  const editMutation = useEditTransaction(id);
  const deleteMutation = useDeleteTransaction(id);

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

  const isLoading =
    transactionQuery.isLoading ||
    categoryQuery.isLoading ||
    accountQuery.isLoading;

  const isPending =
    editMutation.isPending ||
    deleteMutation.isPending ||
    categoryMutation.isPending ||
    accountMutation.isPending;

  const onSubmit = async (values: FormValues) => {
    editMutation.mutate(values, {
      onSuccess: () => {
        onClose();
      },
    });
  };
  const handleDelete = () => {
    setIsOpenDialog(true);
    setOnConfirm(() => async () => {
      deleteMutation.mutate(undefined, {
        onSuccess: () => {
          onClose();
          setIsOpenDialog(false);
        },
      });
    });
  };

  const handleCancel = () => {
    setIsOpenDialog(false);
  };
  const defaultValues = transactionQuery.data
    ? {
        accountId: transactionQuery.data.accountId,
        categoryId: transactionQuery.data.categoryId,
        amount: transactionQuery.data.amount.toString(),
        date: transactionQuery.data.date
          ? new Date(transactionQuery.data.date)
          : new Date(),
        payee: transactionQuery.data.payee,
        notes: transactionQuery.data.notes,
      }
    : {
        accountId: "",
        categoryId: "",
        amount: "",
        date: new Date(),
        payee: "",
        notes: "",
      };
  return (
    <>
      <Dialog open={isOpenDialog} onOpenChange={setIsOpenDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Do you want to delete?</DialogTitle>
            <DialogDescription>
              You are deleting this transaction transaction
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="pt-2">
            <Button type="button" variant={"outline"} onClick={handleCancel}>
              Cancel
            </Button>
            <Button type="button" onClick={onConfirm!}>
              Confirm
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <Sheet open={isOpen} onOpenChange={onClose}>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Edit Transaction</SheetTitle>
            <SheetDescription>Edit an existing transaction</SheetDescription>
          </SheetHeader>
          {isLoading ? (
            <div className="absolute inset-0 flex items-center justify-center">
              <Loader2Icon className="size-4 animate-spin text-muted-foreground" />
            </div>
          ) : (
            <TransactionForm
              id={id}
              onDelete={handleDelete}
              defaultValues={defaultValues}
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
    </>
  );
};

export default EditTransactionSheet;
