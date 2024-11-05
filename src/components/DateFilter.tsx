"use client";
import React, { useState } from "react";
import qs from "query-string";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useGetSummary } from "@/hooks/summary/useGetSummary";
import { Button } from "./ui/button";
import {
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverTrigger,
} from "./ui/popover";
import { format, subDays } from "date-fns";
import { formatDateRange } from "@/lib/formatDateRange";
import { DateRange } from "react-day-picker";
import { CaretSortIcon } from "@radix-ui/react-icons";
import { Calendar } from "./ui/calendar";
import { Separator } from "./ui/separator";

const DateFilter = () => {
  const pathname = usePathname();
  const router = useRouter();
  const params = useSearchParams();
  const accountId = params.get("accountId");
  const from = params.get("from") || "";
  const to = params.get("to") || "";

  const defaultTo = new Date();
  const defaultFrom = subDays(defaultTo, 30);

  const paramState = {
    from: from ? new Date(from) : defaultFrom,
    to: to ? new Date(to) : defaultTo,
  };
  const [date, setDate] = useState<DateRange | undefined>(paramState);

  const pushToUrl = (dateRange: DateRange | undefined) => {
    const query = {
      from: format(dateRange?.from || defaultFrom, "yyyy-MM-dd"),
      to: format(dateRange?.to || defaultTo, "yyyy-MM-dd"),
      accountId,
    };
    const url = qs.stringifyUrl(
      {
        url: pathname,
        query,
      },
      { skipEmptyString: true, skipNull: true }
    );
    router.push(url);
  };

  const onReset = () => {
    setDate(undefined);
    pushToUrl(undefined);
  };
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button size={"sm"} disabled={false} variant={"outline"}>
          <span className="">{formatDateRange(paramState)}</span>
          <CaretSortIcon className="size-4 ml-2"></CaretSortIcon>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full lg:w-auto p-0">
        <Calendar
          disabled={false}
          initialFocus
          mode="range"
          defaultMonth={date?.from}
          selected={date}
          onSelect={setDate}
          numberOfMonths={2}
        ></Calendar>
        <Separator></Separator>
        <div className="w-full p-4 flex items-center justify-between gap-x-2">
          <PopoverClose>
            <Button
              onClick={onReset}
              disabled={!date?.from || !date?.to}
              className="w-full"
              variant={"outline"}
            >
              Reset
            </Button>
          </PopoverClose>
          <PopoverClose>
            <Button
              onClick={() => pushToUrl(date)}
              disabled={!date?.from || !date?.to}
              className="w-full"
              //   variant={"outline"}
            >
              Apply
            </Button>
          </PopoverClose>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default DateFilter;
