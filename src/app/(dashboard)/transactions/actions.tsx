"use client";
import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Edit3Icon, MoreHorizontalIcon, Trash2Icon } from "lucide-react";
import useOpenTransaction from "@/hooks/transactions/useOpenTransaction";
import { useDeleteTransaction } from "@/hooks/transactions/useDeleteTransaction";

type ActionsProps = {
  id: string;
};
const Actions = ({ id }: ActionsProps) => {
  const { onOpen } = useOpenTransaction();
  const deleteMutation = useDeleteTransaction(id);
  const [isOpenDialog, setIsOpenDialog] = React.useState(false);
  const [onConfirm, setOnConfirm] = React.useState<(() => void) | null>(null);

  const isPending = deleteMutation.isPending;

  const handleDelete = () => {
    setIsOpenDialog(true);
    setOnConfirm(() => async () => {
      deleteMutation.mutate(undefined, {
        onSuccess: () => {
          setIsOpenDialog(false);
        },
      });
    });
  };

  const handleCancel = () => {
    setIsOpenDialog(false);
  };
  return (
    <>
      <Dialog open={isOpenDialog} onOpenChange={setIsOpenDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Do you want to delete?</DialogTitle>
            <DialogDescription>
              You are deleting this transaction
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
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant={"outline"}>
            <MoreHorizontalIcon />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem disabled={false} onClick={() => onOpen(id)}>
            <Edit3Icon></Edit3Icon>Edit
          </DropdownMenuItem>
          <DropdownMenuSeparator />

          <DropdownMenuItem onClick={handleDelete} disabled={isPending}>
            <Trash2Icon></Trash2Icon>Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default Actions;
