import React from "react";
import { Paper } from "sea-react-components";
import UpdateAccountForm from "./components/update-account-form";
import ChangePasswordForm from "./components/change-password-form";

export default function UpdateAccountPage() {
  return (
    <div className="flex flex-col gap-10">
      <Paper>
        <div className="flex flex-col gap-10">
          <h3 className="text-black text-3xl font-semibold">
            Update account details
          </h3>
          <UpdateAccountForm />
        </div>
      </Paper>

      <Paper>
        <div className="flex flex-col gap-10">
          <h3 className="text-black text-3xl font-semibold">Change password</h3>
          <ChangePasswordForm />
        </div>
      </Paper>
    </div>
  );
}
