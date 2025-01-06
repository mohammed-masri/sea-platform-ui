"use client";
import AccountTypeBadge from "@/components/account-type-badge";
import { AccountTypes } from "@/dto/account";
import { PermissionKeys } from "@/dto/permission";
import { IRoleFull, IRolePermission } from "@/dto/role";
import RoleActionInstance from "@/store/slices/role/actions";
import clsx from "clsx";
import React, { useEffect, useState } from "react";
import {
  Drawer,
  TreeCheckbox,
  TreeCheckboxNode,
  TreeCheckboxUtils,
} from "sea-react-components";

// const nodes: TreeCheckboxNode[] = [
//   {
//     key: "1",
//     label: "Node 1",
//     children: [
//       { key: "1.1", label: "Child 1.1" },
//       {
//         key: "1.2",
//         label: "Child 1.2",
//         children: [{ key: "1.2.1", label: "Child 1.2.1" }],
//       },
//     ],
//   },
//   { key: "2", label: "Node 2" },
// ];

type RolePermissionProps = {
  permission: IRolePermission;
  prefix: string;
};
const RolePermission = ({ permission, prefix }: RolePermissionProps) => {
  return (
    <div className={clsx(permission.checked === "all" && "text-black")}>
      <p>
        {prefix} {permission.isLeaf && <>&gt;</>}
        {permission.name}
      </p>
      {permission.children &&
        permission.children.map((child) => {
          return (
            <div key={`${child.key}`} className="flex">
              <RolePermission permission={child} prefix={prefix + "---"} />
            </div>
          );
        })}
    </div>
  );
};

type RoleDetailsDrawerProps = {
  roleId: string | undefined;
  isOpen: boolean;
  onClose: () => void;
};
export default function RoleDetailsDrawer({
  roleId,
  isOpen,
  onClose,
}: RoleDetailsDrawerProps) {
  const [role, setRole] = useState<IRoleFull | undefined>(undefined);

  useEffect(() => {
    if (roleId)
      RoleActionInstance.getRoleDetails(roleId).then((response) => {
        setRole(response);
      });
  }, [roleId]);

  let nodes: TreeCheckboxNode<PermissionKeys>[] = [];
  if (role?.permissions) {
    nodes = role.permissions.map((p) =>
      TreeCheckboxUtils.makeTreeNode<IRolePermission>(p, {
        checked: "checked",
        children: "children",
        isLeaf: "isLeaf",
        key: "key",
        label: "name",
      })
    );
  }

  return (
    <Drawer isOpen={isOpen} onClose={onClose}>
      <div className="flex flex-col gap-5">
        <h3 className="font-semibold text-black text-2xl">Role Details</h3>

        <div className="flex flex-col gap-3">
          <div className="flex gap-3 items-center">
            <p className="text-xl text-secondary">{role?.name}</p>
            <AccountTypeBadge type={role?.type || AccountTypes.User} />
          </div>

          <div className="flex gap-1 items-center">
            <p className="text-black">Description:</p>
            <p className="text-text">{role?.description}</p>
          </div>
          <div className="flex flex-col gap-5">
            <p className="text-black">Permissions:</p>

            <div className="pl-5 max-h-80 overflow-y-auto">
              <TreeCheckbox
                name={`permissions-${role?.id}}`}
                nodes={nodes}
                onChange={() => {}}
                readonly
              />
            </div>
          </div>
        </div>
      </div>
    </Drawer>
  );
}
