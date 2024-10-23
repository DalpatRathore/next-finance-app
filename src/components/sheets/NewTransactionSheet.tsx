import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import useNewTransaction from "@/hooks/transactions/useNewTransaction";
// import TransactionForm from "../forms/TransactionForm";
import { insertTranactionSchema } from "@/db/schema";
import { z } from "zod";
import { useCreateTransaction } from "@/hooks/transactions/useCreateTransaction";

const formSchema = insertTranactionSchema.omit({
  id: true,
});
type FormValues = z.input<typeof formSchema>;
const NewTransactionSheet = () => {
  const { isOpen, onClose } = useNewTransaction();
  const mutation = useCreateTransaction();

  const onSubmit = async (values: FormValues) => {
    // console.log(values);
    mutation.mutate(values, {
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
        {/* <TransactionForm
          onSubmit={onSubmit}
          defaultValues={{ name: "" }}
          disabled={mutation.isPending}
        ></TransactionForm> */}
      </SheetContent>
    </Sheet>
  );
};

export default NewTransactionSheet;
