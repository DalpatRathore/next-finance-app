import React from "react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
} from "recharts";
import CustomToolTip from "./CustomToolTip";
import { format } from "date-fns";

type BarVariantProps = {
  data: {
    date: string;
    income: number;
    expenses: number;
  }[];
};

const BarVariant = ({ data }: BarVariantProps) => {
  return (
    <ResponsiveContainer width={"100%"} height={350}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray={"3 3"}></CartesianGrid>
        <XAxis
          axisLine={false}
          tickLine={false}
          dataKey="date"
          tickFormatter={value => format(value, "dd MMM")}
          style={{ fontSize: "12px" }}
          tickMargin={16}
        ></XAxis>
        <Tooltip content={<CustomToolTip />} />
        <Bar
          dataKey={"income"}
          strokeWidth={2}
          fill="#3d82f6"
          className="drop-shadow-sm"
        ></Bar>
        <Bar
          dataKey={"expenses"}
          fill="#f43f5e"
          className="drop-shadow-sm"
        ></Bar>
      </BarChart>
    </ResponsiveContainer>
  );
};

export default BarVariant;
