"use client";
import { useAppDispatch } from "@/store/hooks";
import { AccountTypeSliceActions } from "@/store/slices/account/account-type-slice";
import AccountActionInstance from "@/store/slices/account/actions";
import React, { useEffect } from "react";

export default function StaticDataFetcher({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    AccountActionInstance.getAccountTypes().then((response) => {
      dispatch(AccountTypeSliceActions.setAccountTypes(response));
    });
  }, [dispatch]);

  return <>{children}</>;
}
