import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import ImportTable from "./ImportTable";

const dateFormat = "yyyy-MM-dd HH:mm:ss";
const outputFormat = "yyyy-MM-dd";

const requiredOptions = ["amount", "date", "payee"];

interface SelectedColumnState {
  [key: string]: string | null;
}

type ImportCardProps = {
  data: string[][];
  onCancel: () => void;
  onSubmit: (data: any) => void;
};
const ImportCard = ({ data, onCancel, onSubmit }: ImportCardProps) => {
  const [selectedColumn, setSelectedColumn] = useState<SelectedColumnState>({});

  const headers = data[0];
  const body = data.slice(1);

  const onTableHeadSelectChange = (
    columnIndex: number,
    value: string | null
  ) => {
    setSelectedColumn(prev => {
      const newSelectedColumns = { ...prev };
      for (const key in newSelectedColumns) {
        if (newSelectedColumns[key] === value) {
          newSelectedColumns[key] = null;
        }
      }
      if (value === "skip") {
        value = null;
      }
      newSelectedColumns[`column_${columnIndex}`] = value;
      return newSelectedColumns;
    });
  };

  const progress = Object.values(selectedColumn).filter(Boolean).length;

  return (
    <div className="max-w-screen-2xl mx-auto w-full px-5 lg:px-10">
      <Card>
        <CardHeader className="gap-y-2 lg:flex-row lg:items-center justify-between">
          <CardTitle className="text-xl text-center line-clamp-1">
            Import Transactions
          </CardTitle>
          <div className="flex flex-col lg:flex-row items-center justify-center gap-2">
            <Button
              onClick={onCancel}
              variant={"outline"}
              className="w-full lg:w-auto"
            >
              Cancel
            </Button>
            <Button
              disabled={progress < requiredOptions.length}
              className="w-full lg:w-auto"
            >
              Continue ({progress}/{requiredOptions.length})
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <ImportTable
            headers={headers}
            body={body}
            selectedColumns={selectedColumn}
            onTableHeadSelectChange={onTableHeadSelectChange}
          ></ImportTable>
        </CardContent>
      </Card>
    </div>
  );
};

export default ImportCard;
