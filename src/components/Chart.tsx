import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FileSearch2Icon } from "lucide-react";
import AreaVariant from "./AreaVariant";
import BarVariant from "./BarVariant";
import LineVariant from "./LineVariant";

type ChartProps = {
  data?: {
    date: string;
    income: number;
    expenses: number;
  }[];
};
const Chart = ({ data = [] }: ChartProps) => {
  return (
    <Card className="drop-shadow-sm">
      <CardHeader className="flex space-y-2 lg:space-y-0 lg:flex-row lg:items-center justify-between">
        <CardTitle className="text-xl line-clamp-1">Transactions</CardTitle>
      </CardHeader>
      <CardContent>
        {data.length === 0 ? (
          <div className="flex flex-col gap-y-4 items-center justify-center h-[350px] w-full">
            <FileSearch2Icon className="size-6 text-muted-foreground" />
            <p className="text-muted-foreground text-sm">
              No data for this period
            </p>
          </div>
        ) : (
          <>
            <AreaVariant data={data}></AreaVariant>
            <BarVariant data={data}></BarVariant>
            <LineVariant data={data}></LineVariant>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default Chart;
