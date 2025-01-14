import React from "react";
import { Paper } from "sea-react-components";
import UpdateApplicationForm from "./components/update-application-form";

export default function UpdateApplicationPage() {
  return (
    <div className="flex flex-col gap-10">
      <Paper>
        <div className="flex flex-col gap-10">
          <h3 className="text-black text-3xl font-semibold">
            Update application details
          </h3>
          <UpdateApplicationForm />
        </div>
      </Paper>
    </div>
  );
}
