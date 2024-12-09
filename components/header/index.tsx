import React from "react";
import ProfileMenu from "./profile-menu";
import SidebarToggleButton from "./sidebar-toggle-button";

export default function Header() {
  return (
    <div className="w-full py-2 px-5">
      <div className="flex items-center gap-5 justify-between">
        <SidebarToggleButton />

        <div className="flex items-center gap-5">
          <ProfileMenu />
        </div>
      </div>
    </div>
  );
}
