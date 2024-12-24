import { AccountTypes } from "@/dto/account";
import clsx from "clsx";
import React from "react";

const typeClasses: Record<AccountTypes, string> = {
  Admin: "bg-green-500 text-white",
  User: "bg-yellow-500 text-white",
};

type Props = {
  type: AccountTypes;
};
export default function AccountTypeBadge({ type }: Props) {
  const classes = typeClasses[type];

  return (
    <div
      className={clsx(
        "flex items-center justify-center p-1 rounded-lg",
        classes
      )}
    >
      {type}
    </div>
  );
}
