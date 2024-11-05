import React from "react";
import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { formatPercentage } from "@/lib/amountUtil";
import CategoryToolTip from "./CategoryToolTip";

type PieVariantProps = {
  data: {
    name: string;
    value: number;
  }[];
};
const COLORS = ["#0062ff", "#12c6ff", "#ff647f", "#ff9354"];
const PieVariant = ({ data = [] }: PieVariantProps) => {
  return (
    <ResponsiveContainer width={"100%"} height={350}>
      <PieChart>
        <Legend
          layout="horizontal"
          verticalAlign="bottom"
          align="right"
          iconType="circle"
          content={({ payload }: any) => {
            return (
              <ul className="flex flex-col space-y-2">
                {payload.map((entry: any, i: number) => (
                  <li key={`item-${i}`} className="flex items-center space-x-2">
                    <span
                      className="size-2 rounded-full"
                      style={{ backgroundColor: entry.color }}
                    ></span>
                    <div className="space-x-1">
                      <span className="text-muted-foreground text-xs">
                        {entry.value}
                      </span>
                      <span className="text-xs">
                        {formatPercentage(entry.payload.percent * 100)}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            );
          }}
        />
        <Tooltip content={<CategoryToolTip></CategoryToolTip>}></Tooltip>
        <Pie
          data={data}
          dataKey={"value"}
          labelLine={false}
          cx={"50%"}
          cy={"50%"}
          outerRadius={90}
          innerRadius={60}
          paddingAngle={2}
          fill="#8884d8"
        >
          {data.map((_entry, i) => (
            <Cell key={`cell-${i}`} fill={COLORS[i % COLORS.length]}></Cell>
          ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  );
};

export default PieVariant;
