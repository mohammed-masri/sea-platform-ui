"use client";
import { useAppDispatch } from "@/store/hooks";
import StaticDataActionInstance from "@/store/slices/static/actions";
import { StaticSliceActions } from "@/store/slices/static/slice";

import React, { useEffect } from "react";

export default function StaticDataFetcher({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    StaticDataActionInstance.getPermissions().then((response) => {
      dispatch(StaticSliceActions.setPermissions(response));
    });
  }, [dispatch]);

  return <>{children}</>;
}
