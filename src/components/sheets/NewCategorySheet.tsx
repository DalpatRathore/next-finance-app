import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import useNewCategory from "@/hooks/categories/useNewCategory";
import CategoryForm from "../forms/CategoryForm";
import { insertCategorySchema } from "@/db/schema";
import { z } from "zod";
import { useCreateCategory } from "@/hooks/categories/useCreateCategory";

const formSchema = insertCategorySchema.pick({
  name: true,
});
type FormValues = z.input<typeof formSchema>;
const NewCategorySheet = () => {
  const { isOpen, onClose } = useNewCategory();
  const mutation = useCreateCategory();

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
          <SheetTitle>New Category</SheetTitle>
          <SheetDescription>
            Create a new category to track your transactions.
          </SheetDescription>
        </SheetHeader>
        <CategoryForm
          onSubmit={onSubmit}
          defaultValues={{ name: "" }}
          disabled={mutation.isPending}
        ></CategoryForm>
      </SheetContent>
    </Sheet>
  );
};

export default NewCategorySheet;
