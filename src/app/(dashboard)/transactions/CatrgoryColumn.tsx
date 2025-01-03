import useOpenCategory from "@/hooks/categories/useOpenCategory";
import useOpenTransaction from "@/hooks/transactions/useOpenTransaction";
import { cn } from "@/lib/utils";
import { TriangleAlertIcon } from "lucide-react";
import React from "react";

type CategoryColumnProps = {
  id: string;
  category: string | null;
  categoryId: string | null;
};
const CategoryColumn = ({ id, category, categoryId }: CategoryColumnProps) => {
  const { onOpen: onOpenCategory } = useOpenCategory();
  const { onOpen: onOpenTransaction } = useOpenTransaction();
  const handleClick = () => {
    if (categoryId) {
      onOpenCategory(categoryId);
    } else {
      onOpenTransaction(id);
    }
  };

  return (
    <div
      className={cn(
        "flex items-center cursor-pointer hover:underline",
        !category && "text-rose-500"
      )}
      onClick={handleClick}
    >
      {!category && <TriangleAlertIcon className="size-4 shrink-0 mr-2" />}
      {category || "Uncategorized"}
    </div>
  );
};

export default CategoryColumn;
