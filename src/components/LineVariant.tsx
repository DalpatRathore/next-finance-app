import React from "react";
import {
  Line,
  LineChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
} from "recharts";
import CustomToolTip from "./CustomToolTip";
import { format } from "date-fns";

type LineVariantProps = {
  data: {
    date: string;
    income: number;
    expenses: number;
  }[];
};

const LineVariant = ({ data }: LineVariantProps) => {
  return (
    <ResponsiveContainer width={"100%"} height={350}>
      <LineChart data={data}>
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
        <Line
          // dot={false}
          dataKey={"income"}
          strokeWidth={2}
          stroke="#3d82f6"
          className="drop-shadow-sm"
        ></Line>
        <Line
          dataKey={"expenses"}
          stroke="#f43f5e"
          strokeWidth={2}
          className="drop-shadow-sm"
        ></Line>
      </LineChart>
    </ResponsiveContainer>
  );
};

export default LineVariant;
