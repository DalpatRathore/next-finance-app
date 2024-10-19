"use client";
import { DataTable } from "@/components/DataTable";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import useNewCategory from "@/hooks/categories/useNewCategory";
import { Loader2Icon, PlusCircleIcon } from "lucide-react";
import { columns } from "@/app/(dashboard)/categories/columns";
import { useGetCategories } from "@/hooks/categories/useGetCategories";
import { Skeleton } from "@/components/ui/skeleton";
import { useBulkDeleteCategories } from "@/hooks/categories/useBulkDeleteCategories";

const CategoriesPage = () => {
  const { onOpen } = useNewCategory();

  const categoriesQuery = useGetCategories();
  const categories = categoriesQuery.data || [];

  const deleteCategories = useBulkDeleteCategories();
  const isDisabled = categoriesQuery.isLoading || deleteCategories.isPending;

  if (categoriesQuery.isLoading) {
    return (
      <div className="max-w-screen-2xl mx-auto w-full px-5 lg:px-10">
        <Card className="">
          <CardHeader className="gap-y-2 lg:flex-row lg:items-center justify-between">
            <CardTitle className="text-xl text-center line-clamp-1 text-muted-foreground">
              Categories Dashboard
            </CardTitle>

            <Skeleton className="w-full lg:w-32 h-10"></Skeleton>
          </CardHeader>
          <CardContent>
            <div className="h-80 w-full flex items-center justify-center">
              <Loader2Icon className="size-6 animate-spin" />
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-screen-2xl mx-auto w-full px-5 lg:px-10">
      <Card className="">
        <CardHeader className="gap-y-2 lg:flex-row lg:items-center justify-between">
          <CardTitle className="text-xl text-center line-clamp-1">
            Categories Dashboard
          </CardTitle>
          <Button onClick={onOpen}>
            <PlusCircleIcon className="size-4" /> Add New
          </Button>
        </CardHeader>
        <CardContent>
          <DataTable
            columns={columns}
            data={categories}
            filterKey="name"
            onDelete={row => {
              const ids = row.map(r => r.original.id.toString());
              console.log(typeof ids);
              deleteCategories.mutate({ json: { ids: ids } });
            }}
            disabled={isDisabled}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default CategoriesPage;
