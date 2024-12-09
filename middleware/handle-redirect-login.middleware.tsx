"use client";
import { useAppDispatch } from "@/store/hooks";
import { setAccessToken } from "@/store/slices/auth/slice";
import React, { useEffect, useState } from "react";
import { useGetQueryParam } from "@/hooks/useGetQueryParam";
import { Constants } from "@/config";

export default function HandleRedirectLogin({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const dispatch = useAppDispatch();
  const [isTokenProcessed, setIsTokenProcessed] = useState(false);

  const params = useGetQueryParam();
  const token = params("token");

  useEffect(() => {
    if (token) {
      dispatch(setAccessToken(token));
      localStorage.setItem(Constants.LocalStorageKeys.JWTToken, token);
    }
    setIsTokenProcessed(true);
  }, [dispatch, token]);

  // Wait until the token is processed
  if (!isTokenProcessed) {
    return null;
  }

  return <>{children}</>;
}
