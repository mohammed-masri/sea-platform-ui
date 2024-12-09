"use client";
import React from "react";
import AlertHandler from "@/components/alert-handler";
import DynamicBreadcrumb from "@/components/dynamic-breadcrumb";
import Footer from "@/components/footer";
import Header from "@/components/header";
import LayoutController from "@/components/layout-controller";
import Sidebar from "@/components/sidebar";
import { useAppSelector } from "@/store/hooks";
import { selectSidebarState } from "@/store/slices/layout/slice";
import clsx from "clsx";

export default function LoggedUserLayoutUI({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const sidebar = useAppSelector(selectSidebarState);

  return (
    <div className="flex flex-row gap-5 h-screen bg-secondary">
      {/* Sidebar */}
      {sidebar.open && (
        <div
          className={clsx(
            "fixed top-0 left-0 h-full",
            sidebar.mode === "full" ? "w-64" : "w-16"
          )}
        >
          <Sidebar />
        </div>
      )}

      {/* Main content */}
      <div
        className={clsx(
          "flex-1 flex flex-col",
          !sidebar.open ? "ml-0" : sidebar.mode === "full" ? "ml-64" : "ml-16"
        )}
      >
        {/* Header */}
        <div
          className={clsx(
            "fixed top-0 right-0 z-10 bg-secondary",
            !sidebar.open
              ? "left-0"
              : sidebar.mode === "full"
              ? "left-64"
              : "left-16"
          )}
        >
          <Header />
        </div>

        {/* Page content */}
        <div className="flex-1 overflow-auto pt-16 pl-5 pr-3 bg-bg-light pb-10 flex flex-col gap-10">
          <div className="flex flex-col gap-3">
            <AlertHandler />
            <DynamicBreadcrumb />
          </div>

          <div id="page-content">{children}</div>
        </div>

        {/* Footer */}
        <div className="pl-5 bg-bg-light">
          <Footer />
        </div>
      </div>

      <LayoutController />
    </div>
  );
}
