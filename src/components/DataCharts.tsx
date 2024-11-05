"use client";
import { useGetSummary } from "@/hooks/summary/useGetSummary";
import React from "react";
import Chart from "./Chart";
import SpendingPie from "./SpendingPie";

const DataCharts = () => {
  const { data, isLoading } = useGetSummary();

  if (isLoading) {
    return <h1>Loading</h1>;
  }
  return (
    <div className="grid grid-cols-1 lg:grid-cols-6 gap-8">
      <div className="col-span-1 lg:col-span-3 xl:col-span-4">
        <Chart data={data?.days}></Chart>
      </div>
      <div className="col-span-1 lg:col-span-3 xl:col-span-2">
        <SpendingPie data={data?.categories}></SpendingPie>
      </div>
    </div>
  );
};

export default DataCharts;