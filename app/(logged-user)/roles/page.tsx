import React from "react";
import { Button } from "sea-react-components";
import Link from "next/link";
import RolesTable from "./components/roles-table";

export default function RolesPage() {
  return (
    <div className="grid grid-cols-12 gap-5">
      <div className="col-span-12 flex justify-end">
        <Button className="bg-secondary">
          <Link href="/roles/create">Create new role</Link>
        </Button>
      </div>
      <div className="col-span-12">
        <RolesTable />
      </div>
    </div>
  );
}
