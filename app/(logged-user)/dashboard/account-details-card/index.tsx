"use client";
import { useAppSelector } from "@/store/hooks";
import { selectAccountData } from "@/store/slices/auth/slice";
import React from "react";
import { Paper } from "sea-react-components";

export default function AccountDetailsCard() {
  const account = useAppSelector(selectAccountData);
  return (
    <Paper>
      <div>
        <h3 className="text-3xl text-text">
          Welcome <span className="font-semibold">{account?.name}</span>
        </h3>
      </div>
    </Paper>
  );
}
