import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import useOpenCategory from "@/hooks/categories/useOpenCategory";
import CategoryForm from "../forms/CategoryForm";
import { insertCategorySchema } from "@/db/schema";
import { z } from "zod";
import { useGetCategory } from "@/hooks/categories/useGetCategory";
import { Loader2Icon } from "lucide-react";
import { useEditCategory } from "@/hooks/categories/useEditCategory";
import { useDeleteCategory } from "@/hooks/categories/useDeleteCategory";
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

const formSchema = insertCategorySchema.pick({
  name: true,
});
type FormValues = z.input<typeof formSchema>;
const EditCategorySheet = () => {
  const [isOpenDialog, setIsOpenDialog] = React.useState(false);
  const [onConfirm, setOnConfirm] = React.useState<(() => void) | null>(null);
  const { isOpen, onClose, id } = useOpenCategory();

  const categoryQuery = useGetCategory(id);
  const editMutation = useEditCategory(id);
  const deleteMutation = useDeleteCategory(id);

  const isLoading = categoryQuery.isLoading;
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
  const defaultValues = categoryQuery.data
    ? {
        name: categoryQuery.data.name,
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
              You are deleting this category
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
            <SheetTitle>Edit Category</SheetTitle>
            <SheetDescription>Edit an existing category</SheetDescription>
          </SheetHeader>
          {isLoading ? (
            <div className="absolute inset-0 flex items-center justify-center">
              <Loader2Icon className="size-4 animate-spin text-muted-foreground" />
            </div>
          ) : (
            <CategoryForm
              id={id}
              onSubmit={onSubmit}
              defaultValues={defaultValues}
              disabled={isPending}
              onDelete={handleDelete}
            ></CategoryForm>
          )}
        </SheetContent>
      </Sheet>
    </>
  );
};

export default EditCategorySheet;
