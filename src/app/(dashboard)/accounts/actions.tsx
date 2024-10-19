"use client";
import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Edit3Icon, MoreHorizontalIcon, Trash2Icon } from "lucide-react";
import useOpenAccount from "@/hooks/useOpenAccount";

type ActionsProps = {
  id: string;
};
const Actions = ({ id }: ActionsProps) => {
  const { onOpen } = useOpenAccount();
  return (
    <>
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

          <DropdownMenuItem>
            <Trash2Icon></Trash2Icon>Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default Actions;
