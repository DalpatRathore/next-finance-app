import React from "react";
import {
  Legend,
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  ResponsiveContainer,
} from "recharts";

type RadarVariantProps = {
  data: {
    name: string;
    value: number;
  }[];
};
const RadarVariant = ({ data = [] }: RadarVariantProps) => {
  return (
    <ResponsiveContainer width={"100%"} height={350}>
      <RadarChart
        cx={"50%"}
        cy={"50%"}
        outerRadius={"60%"}
        data={data}
        width={730}
        height={250}
      >
        <PolarGrid></PolarGrid>
        <PolarAngleAxis
          style={{ fontSize: "12px" }}
          dataKey={"name"}
        ></PolarAngleAxis>
        <PolarRadiusAxis style={{ fontSize: "12px" }}></PolarRadiusAxis>
        <Radar
          dataKey={"value"}
          stroke="#3b82f6"
          fill="#3b82f6"
          fillOpacity={0.6}
        ></Radar>
        <Legend />
      </RadarChart>
    </ResponsiveContainer>
  );
};

export default RadarVariant;
