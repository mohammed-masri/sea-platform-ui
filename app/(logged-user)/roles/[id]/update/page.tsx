import React from "react";
import { Paper } from "sea-react-components";
import UpdateRoleForm from "./components/update-role-form";

export default function UpdateRolePage() {
  return (
    <div className="flex flex-col gap-10">
      <Paper>
        <div className="flex flex-col gap-10">
          <h3 className="text-black text-3xl font-semibold">
            Update role details
          </h3>
          <UpdateRoleForm />
        </div>
      </Paper>
    </div>
  );
}
