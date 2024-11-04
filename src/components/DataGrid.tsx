"use client";
import { useGetSummary } from "@/hooks/summary/useGetSummary";
import { formatDateRange } from "@/lib/formatDateRange";
import { useSearchParams } from "next/navigation";
import React from "react";
import DataCard, { DataCardLoading } from "./DataCard";
import { FaArrowTrendDown, FaArrowTrendUp, FaPiggyBank } from "react-icons/fa6";

const DataGrid = () => {
  const params = useSearchParams();
  const to = params.get("to") || undefined;
  const from = params.get("from") || undefined;

  const { data, isLoading } = useGetSummary();

  const dateRangeLabel = formatDateRange({ to, from });

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pb-2 mb-8">
        <DataCardLoading></DataCardLoading>
        <DataCardLoading></DataCardLoading>
        <DataCardLoading></DataCardLoading>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pb-2 mb-8">
      <DataCard
        title="Remaining"
        value={data?.remainingAmount}
        percentageChange={data?.remainingChange}
        icon={FaPiggyBank}
        variant="danger"
        dateRange={dateRangeLabel}
      ></DataCard>
      <DataCard
        title="Income"
        value={data?.incomeAmount}
        percentageChange={data?.incomeChange}
        icon={FaArrowTrendUp}
        variant="success"
        dateRange={dateRangeLabel}
      ></DataCard>
      <DataCard
        title="Expenses"
        value={data?.expenseAmount}
        percentageChange={data?.expensesChange}
        icon={FaArrowTrendDown}
        variant="warning"
        dateRange={dateRangeLabel}
      ></DataCard>
    </div>
  );
};

export default DataGrid;
