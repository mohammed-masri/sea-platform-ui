import { IRoleShort } from "@/dto/role";
import React from "react";
import { ColorUtils } from "sea-react-components";

type Props = {
  role: IRoleShort;
};
export default function AccountRoleBadge({ role }: Props) {
  return (
    <div
      className="flex items-center justify-center rounded-lg px-2 py-1"
      style={{ backgroundColor: role.color }}
    >
      <p
        style={{
          color: ColorUtils.isColorLight(role.color) ? "#000000" : "#FFFFFF",
        }}
      >
        {role.name}
      </p>
    </div>
  );
}
