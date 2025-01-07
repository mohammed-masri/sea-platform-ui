import React from "react";
import AccountsTable from "./components/accounts-table";
import { Button, Icon, Tooltip } from "sea-react-components";
import Link from "next/link";

export default function AccountsPage() {
  return (
    <div className="grid grid-cols-12 gap-5">
      <div className="col-span-12 flex items-center justify-end gap-5">
        <Link
          href="/accounts/recycle-bin"
          className="flex items-center gap-1 text-warning"
        >
          <Tooltip text="Recycle Bin" containerClassName="bg-warning w-22">
            <Icon icon="fluent-mdl2:empty-recycle-bin" className="w-5 h-5" />
          </Tooltip>
        </Link>
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
