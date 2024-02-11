import React from "react";

import { AlignCenter, MenuIcon } from "lucide-react";

import useDashboardSideBar from "@/hooks/useSideMenu";

function DashboardSideBarToggle() {
  const { isToggled, setIsToggled } = useDashboardSideBar();
  return !isToggled ? (
    <button onClick={() => setIsToggled(true)} className="lg:hidden">
      <MenuIcon />
    </button>
  ) : (
    <button onClick={() => setIsToggled(false)} className="lg:hidden">
      <AlignCenter />
    </button>
  );
}

export default DashboardSideBarToggle;
