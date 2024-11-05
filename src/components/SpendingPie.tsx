import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  FileSearch2Icon,
  Loader2Icon,
  PieChartIcon,
  Radar,
  TargetIcon,
} from "lucide-react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import PieVariant from "./PieVariant";
import RadarVariant from "./RadarVariants";
import RadialVariant from "./RadialVariant";
import { Skeleton } from "./ui/skeleton";

type SpendingPieProps = {
  data?: {
    name: string;
    value: number;
  }[];
};
const SpendingPie = ({ data = [] }: SpendingPieProps) => {
  const [chartType, setChartType] = useState("pie");

  const onChartTypeChange = (type: string) => {
    setChartType(type);
  };
  return (
    <Card className="drop-shadow-sm">
      <CardHeader className="flex space-y-2 lg:space-y-0 lg:flex-row lg:items-center justify-between">
        <CardTitle className="text-xl line-clamp-1">Categories</CardTitle>
        <Select defaultValue={chartType} onValueChange={onChartTypeChange}>
          <SelectTrigger className="lg:w-auto h-9 rounded-md px-3">
            <SelectValue placeholder="Chart Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="pie">
              <div className="flex items-center">
                <PieChartIcon className="size-4 mr-2 shrink-0" />
                <p className="line-clamp-1">Pie Chart</p>
              </div>
            </SelectItem>
            <SelectItem value="radar">
              <div className="flex items-center">
                <Radar className="size-4 mr-2 shrink-0" />
                <p className="line-clamp-1">Radar Chart</p>
              </div>
            </SelectItem>
            <SelectItem value="radial">
              <div className="flex items-center">
                <TargetIcon className="size-4 mr-2 shrink-0" />
                <p className="line-clamp-1">Radial Chart</p>
              </div>
            </SelectItem>
          </SelectContent>
        </Select>
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
            {chartType === "pie" && <PieVariant data={data}></PieVariant>}
            {chartType === "radar" && <RadarVariant data={data}></RadarVariant>}
            {chartType === "radial" && (
              <RadialVariant data={data}></RadialVariant>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
};
export const SpendingPieLoading = () => {
  return (
    <Card className="drop-shadow-sm">
      <CardHeader className="flex space-y-2 lg:space-y-0 lg:flex-row lg:items-center justify-between">
        <Skeleton className="w-48 h-8" />
        <Skeleton className="w-full lg:w-[120px] h-8" />
      </CardHeader>
      <CardContent>
        <div className="h-[350px] w-full flex items-center justify-center">
          <Loader2Icon className="size-6 text-slate-300 animate-spin"></Loader2Icon>
        </div>
      </CardContent>
    </Card>
  );
};
export default SpendingPie;
