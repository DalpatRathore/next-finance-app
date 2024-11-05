import React from "react";
import {
  RadialBarChart,
  Legend,
  RadialBar,
  ResponsiveContainer,
} from "recharts";
import { formatCurrency } from "@/lib/amountUtil";

type RadialVariantProps = {
  data: {
    name: string;
    value: number;
  }[];
};
const COLORS = ["#0062ff", "#12c6ff", "#ff647f", "#ff9354"];
const RadialVariant = ({ data = [] }: RadialVariantProps) => {
  return (
    <ResponsiveContainer width={"100%"} height={350}>
      <RadialBarChart
        cx={"50%"}
        cy={"30%"}
        barSize={10}
        innerRadius={"90%"}
        outerRadius={"40%"}
        data={data.map((item, i) => ({
          ...item,
          fill: COLORS[i % COLORS.length],
        }))}
      >
        <RadialBar
          label={{
            position: "insideStart",
            fill: "#FFF",
            fontSize: "12px",
          }}
          background
          dataKey={"value"}
        ></RadialBar>
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
                        {formatCurrency(entry.payload.value * 100)}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            );
          }}
        />
      </RadialBarChart>
    </ResponsiveContainer>
  );
};

export default RadialVariant;
