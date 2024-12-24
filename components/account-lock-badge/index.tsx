import clsx from "clsx";
import React from "react";
import { Button, Icon } from "sea-react-components";

type Props = {
  isLocked: boolean;
};
export default function AccountLookBadge({ isLocked }: Props) {
  return (
    <div className="flex items-center justify-center">
      <Button className="bg-secondary bg-opacity-50 flex items-center justify-center gap-1">
        <Icon
          icon={isLocked ? "si:lock-fill" : "si:unlock-fill"}
          className={clsx(
            "w-5 h-6",
            isLocked ? "text-warning" : "text-success"
          )}
        />

        <p>{isLocked ? "Locked" : "Unlocked"}</p>
      </Button>
    </div>
  );
}
