"use client";
import { useAppDispatch } from "@/store/hooks";

import React, { useEffect } from "react";

export default function StaticDataFetcher({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const dispatch = useAppDispatch();

  useEffect(() => {}, [dispatch]);

  return <>{children}</>;
}
