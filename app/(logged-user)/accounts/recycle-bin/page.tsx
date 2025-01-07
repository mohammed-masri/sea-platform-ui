import Link from "next/link";
import React from "react";
import AccountsTable from "../components/accounts-table";
import { Button } from "sea-react-components";

export default function RecycleBinAccountsPage() {
  return (
    <div className="grid grid-cols-12 gap-5">
      <div className="col-span-12 flex items-center justify-end gap-5">
        <Button className="bg-secondary">
          <Link href="/accounts/create">Create new account</Link>
        </Button>
      </div>
      <div className="col-span-12">
        <AccountsTable isDeleted />
      </div>
    </div>
  );
}
