"use client";
import React from "react";
import Link from "next/link";
import { Breadcrumb } from "sea-react-components";
import { usePathname } from "next/navigation";

export default function DynamicBreadcrumb() {
  const pathname = usePathname();

  const segments = pathname.split("/").filter((segment) => segment);

  return (
    <Breadcrumb name="Global">
      <Link href="/dashboard">Home</Link>
      {/* Map over segments to generate breadcrumb links */}
      {segments.map((segment, index) => {
        // Create the URL for the current segment
        const href = "/" + segments.slice(0, index + 1).join("/");

        // Capitalize the segment for display
        let label = segment.charAt(0).toUpperCase() + segment.slice(1);
        label = label.replaceAll("-", " ");

        return (
          <Link key={href} href={href}>
            {label}
          </Link>
        );
      })}
    </Breadcrumb>
  );
}
