import { Button } from "@/components/ui/button";
import { ImportIcon } from "lucide-react";
import React from "react";

import { useCSVReader } from "react-papaparse";

type UploadButtonProps = {
  onUpload: (results: any) => void;
};
const UploadButton = ({ onUpload }: UploadButtonProps) => {
  const { CSVReader } = useCSVReader();
  //   TODO:

  return (
    <CSVReader onUploadAccepted={onUpload}>
      {({ getRootProps }: any) => (
        <Button
          {...getRootProps()}
          className="w-full lg:w-auto"
          variant={"outline"}
        >
          <ImportIcon className="size-4 mr-2" />
          Import
        </Button>
      )}
    </CSVReader>
  );
};

export default UploadButton;
