"use client";
import { useEffect } from "react";
import { useAppDispatch } from "@/store/hooks";
import { setSidebarMode } from "@/store/slices/layout/slice";
import useBreakpoint from "@/hooks/useBreakpoint";

export default function LayoutController() {
  const dispatch = useAppDispatch();

  const breakpoint = useBreakpoint();
  useEffect(() => {
    if (["md", "sm", "xs"].includes(breakpoint))
      dispatch(setSidebarMode("short"));
    else dispatch(setSidebarMode("full"));
  }, [breakpoint, dispatch]);

  return null;
}
