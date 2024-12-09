"use client";
import React from "react";
import {
  selectSidebarState,
  toggleOpenSidebar,
} from "@/store/slices/layout/slice";
import { Icon } from "sea-react-components";
import { useAppDispatch, useAppSelector } from "@/store/hooks";

export default function SidebarToggleButton() {
  const dispatch = useAppDispatch();
  const sidebar = useAppSelector(selectSidebarState);
  return (
    <button onClick={() => dispatch(toggleOpenSidebar())}>
      <Icon
        icon={sidebar.open ? "ic:baseline-menu-open" : "line-md:menu"}
        className="w-5 h-5 text-white"
      />
    </button>
  );
}
