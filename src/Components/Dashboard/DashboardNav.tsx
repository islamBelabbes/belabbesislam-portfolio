import { ChevronRight, Mail } from "lucide-react";
import React from "react";

function DashboardNav() {
  return (
    <div className="flex flex-col gap-[18px] mt-4">
      <DashboardNavItem />
      <DashboardNavItem />
      <DashboardNavItem />
      <DashboardNavItem />
      <DashboardNavItem />
    </div>
  );
}

function DashboardNavItem() {
  return (
    <div className="flex items-center justify-between w-full">
      <div className="flex gap-3">
        <Mail />
        <span>Mail</span>
      </div>
      <div>
        <ChevronRight />
      </div>
    </div>
  );
}

export default DashboardNav;
