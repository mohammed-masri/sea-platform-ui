"use client";
import React from "react";
import { Icon } from "sea-react-components";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { Tooltip } from "sea-react-components";
import { useAppSelector } from "@/store/hooks";
import { selectSidebarState } from "@/store/slices/layout/slice";

type Props = {
  label: string;
  icon: string;
  link: string;
};
export default function SidebarItem({ label, icon, link }: Props) {
  const pathname = usePathname();
  const isSelected = pathname.includes(link);

  const sidebar = useAppSelector(selectSidebarState);

  const Content = () => (
    <Link
      href={link}
      className={clsx(
        "px-2 py-1 flex items-center justify-start gap-5 hover:bg-white hover:bg-opacity-50 transition-all duration-300 ease-in-out rounded-xl hover:shadow-lg group",
        sidebar.mode === "full" ? "w-full" : "w-min",
        isSelected && sidebar.mode === "full"
          ? " bg-white shadow-lg"
          : "shadow-none  bg-transparent"
      )}
    >
      <div
        className={clsx(
          "p-2 rounded-xl shadow-xl group-hover:bg-primary-light group-hover:text-white",
          isSelected
            ? "bg-primary-light text-white"
            : "bg-white text-primary-light"
        )}
      >
        <Icon icon={icon} className="w-5 h-5" />
      </div>
      <p
        className={clsx(
          "text-lg font-semibold truncate",
          isSelected ? "text-primary-light" : "text-white",
          sidebar.mode === "full" ? "block" : "hidden"
        )}
      >
        {label}
      </p>
    </Link>
  );

  if (sidebar.mode === "short")
    return (
      <Tooltip text={label} placement="right">
        <Content />
      </Tooltip>
    );

  return <Content />;
}
