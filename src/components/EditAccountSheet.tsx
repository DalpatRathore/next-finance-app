import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import useOpenAccount from "@/hooks/useOpenAccount";
import AccountForm from "./forms/AccountForm";
import { insertAccountSchema } from "@/db/schema";
import { z } from "zod";
import { useGetAccount } from "@/hooks/useGetAccount";
import { Loader2Icon } from "lucide-react";
import { useEditAccount } from "@/hooks/useEditAccount";
import { useDeleteAccount } from "@/hooks/useDeleteAccount";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import React from "react";
import { Button } from "./ui/button";

const formSchema = insertAccountSchema.pick({
  name: true,
});
type FormValues = z.input<typeof formSchema>;
const EditAccountSheet = () => {
  const [isOpenDialog, setIsOpenDialog] = React.useState(false);
  const [onConfirm, setOnConfirm] = React.useState<(() => void) | null>(null);
  const { isOpen, onClose, id } = useOpenAccount();

  const accountQuery = useGetAccount(id);
  const editMutation = useEditAccount(id);
  const deleteMutation = useDeleteAccount(id);

  const isLoading = accountQuery.isLoading;
  const isPending = editMutation.isPending || deleteMutation.isPending;

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
  const defaultValues = accountQuery.data
    ? {
        name: accountQuery.data.name,
      }
    : { name: "" };
  return (
    <>
      {" "}
      <Dialog open={isOpenDialog} onOpenChange={setIsOpenDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Do you want to delete?</DialogTitle>
            <DialogDescription>
              You are deleting this account transaction
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
            <SheetTitle>Edit Account</SheetTitle>
            <SheetDescription>Edit an existing account</SheetDescription>
          </SheetHeader>
          {isLoading ? (
            <div className="absolute inset-0 flex items-center justify-center">
              <Loader2Icon className="size-4 animate-spin text-muted-foreground" />
            </div>
          ) : (
            <AccountForm
              id={id}
              onSubmit={onSubmit}
              defaultValues={defaultValues}
              disabled={isPending}
              onDelete={handleDelete}
            ></AccountForm>
          )}
        </SheetContent>
      </Sheet>
    </>
  );
};

export default EditAccountSheet;
