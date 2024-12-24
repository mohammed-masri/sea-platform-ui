"use client";
import React from "react";
import SidebarItem from "./sidebar-item";
import Image from "next/image";
import Link from "next/link";
import { useAppSelector } from "@/store/hooks";
import { selectSidebarState } from "@/store/slices/layout/slice";
import clsx from "clsx";

export default function Sidebar() {
  const sidebar = useAppSelector(selectSidebarState);
  return (
    <div
      className={clsx(
        "py-5 bg-secondary h-screen relative",
        sidebar.mode === "full" ? "px-5" : "px-1"
      )}
    >
      <div className="flex flex-col gap-5">
        <Link href="/dashboard" className="flex items-center gap-3 pl-1">
          <Image
            src="/images/sea-logo.png"
            width={50}
            height={50}
            alt="SEA logo"
          />

          <h1
            className={clsx(
              "text-white",
              sidebar.mode === "full" ? "block" : "hidden"
            )}
          >
            SEA Platform
          </h1>
        </Link>

        <div className="flex flex-col gap-2">
          <SidebarItem label="Dashboard" icon="ion:home" link="/dashboard" />
        </div>
        <div className="flex flex-col gap-2">
          <SidebarItem
            label="Accounts"
            icon="mdi:accounts-group"
            link="/accounts"
          />
        </div>
      </div>

      <Image
        src="/images/sidebar-image.png"
        alt="Sidebar image"
        width={220}
        height={220}
        className="absolute left-0 bottom-0"
      />
    </div>
  );
}
