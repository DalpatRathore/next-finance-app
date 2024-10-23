import useOpenAccount from "@/hooks/accounts/useOpenAccount";
import React from "react";

type AccountColumnProps = {
  account: string;
  accountId: string;
};
const AccountColumn = ({ account, accountId }: AccountColumnProps) => {
  const { onOpen: onOpenAccount } = useOpenAccount();
  const handleClick = () => {
    onOpenAccount(accountId);
  };

  return (
    <div
      className="flex items-center cursor-pointer hover:underline"
      onClick={handleClick}
    >
      {account}
    </div>
  );
};

export default AccountColumn;
