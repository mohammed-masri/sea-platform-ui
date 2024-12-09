"use client";
import React from "react";
import { MomentUtils } from "sea-react-components";

export default function Footer() {
  return (
    <div className="pb-2">
      <p className="text-gray-500">
        @ {MomentUtils.getCurrentYear()} copyright, Made by{" "}
        <span className="text-primary-light font-semibold">SEA</span>
      </p>
    </div>
  );
}
