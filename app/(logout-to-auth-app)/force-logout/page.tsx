"use client";
import { Constants } from "@/config";
import { AUTH_URLs } from "@/config/env";
import { useAppDispatch } from "@/store/hooks";
import { logout } from "@/store/slices/auth/slice";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

export default function ForceLogoutPage() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  useEffect(() => {
    localStorage.removeItem(Constants.LocalStorageKeys.JWTToken);
    dispatch(logout());
    router.replace(AUTH_URLs.FORCE_LOGOUT);
  }, [dispatch, router]);
  return <div>Logging out...</div>;
}
