import React from "react";
import AccountFilter from "./AccountFilter";
import DateFilter from "./DateFilter";

const Filters = () => {
  return (
    <div className="flex flex-col lg:flex-row items-center gap-y-2 lg:gap-y-0 lg:gap-x-2 justify-center">
      <AccountFilter></AccountFilter>
      <DateFilter></DateFilter>
    </div>
  );
};

export default Filters;
