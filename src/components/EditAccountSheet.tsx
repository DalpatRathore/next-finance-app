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

const formSchema = insertAccountSchema.pick({
  name: true,
});
type FormValues = z.input<typeof formSchema>;
const EditAccountSheet = () => {
  const { isOpen, onClose, id } = useOpenAccount();

  const accountQuery = useGetAccount(id);
  const editMutation = useEditAccount(id);

  const isLoading = accountQuery.isLoading;
  const isPending = accountQuery.isPending;

  const onSubmit = async (values: FormValues) => {
    editMutation.mutate(values, {
      onSuccess: () => {
        onClose();
      },
    });
  };

  const defaultValues = accountQuery.data
    ? {
        name: accountQuery.data.name,
      }
    : { name: "" };
  return (
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
          ></AccountForm>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default EditAccountSheet;
