import React from "react";
import AccountsTable from "./components/accounts-table";
import { Button } from "sea-react-components";
import Link from "next/link";

export default function AccountsPage() {
  return (
    <div className="grid grid-cols-12 gap-5">
      <div className="col-span-12 flex justify-end">
        <Button className="bg-secondary">
          <Link href="/accounts/create">Create new account</Link>
        </Button>
      </div>
      <div className="col-span-12">
        <AccountsTable />
      </div>
    </div>
  );
}
