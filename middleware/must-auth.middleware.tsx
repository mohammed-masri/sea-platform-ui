"use client";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { pushNewAlert } from "@/store/slices/alert/slice";
import {
  selectAccessToken,
  selectAccountData,
  setAccountData,
} from "@/store/slices/auth/slice";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AUTH_URLs } from "@/config/env";
import AuthActionInstance from "@/store/slices/auth/actions";

export default function MustAuth({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const accessToken = useAppSelector(selectAccessToken);
  const account = useAppSelector(selectAccountData);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  useEffect(() => {
    if (!accessToken) {
      dispatch(
        pushNewAlert({
          message: "Session Expired!",
          type: "error",
          theme: "light",
        })
      );

      router.replace(`${AUTH_URLs.LOGIN}?redirectURL=${window.location}`);
    } else if (accessToken && !account) {
      AuthActionInstance.getMe()
        .then((response) => {
          dispatch(setAccountData(response));
        })
        .finally(() => {
          setIsCheckingAuth(false);
        });
    } else {
      setIsCheckingAuth(false);
    }
  }, [accessToken, dispatch, router, account]);

  if (isCheckingAuth) {
    return null;
  }

  return <>{children}</>;
}
