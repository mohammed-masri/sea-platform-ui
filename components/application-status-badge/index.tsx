import { ApplicationStatuses } from "@/dto/application";
import clsx from "clsx";
import React from "react";
import { Icon } from "sea-react-components";

const statusClasses: Record<ApplicationStatuses, string> = {
  Unavailable: "bg-gray-400 text-white",
  Available: "bg-green-500 text-white",
  "Under-Repair": "bg-warning text-white",
};

const statusIcons: Record<ApplicationStatuses, string> = {
  Unavailable: "iconamoon:unavailable-fill",
  Available: "fluent:presence-available-10-regular",
  "Under-Repair": "hugeicons:repair",
};

type Props = {
  status: ApplicationStatuses;
};
export default function ApplicationStatusBadge({ status }: Props) {
  const classes = statusClasses[status];
  const icon = statusIcons[status];

  return (
    <div
      className={clsx(
        "flex items-center justify-center px-2 py-1 rounded-lg gap-1",
        classes
      )}
    >
      <Icon icon={icon} />
      <p>{status.replaceAll("-", " ")}</p>
    </div>
  );
}
