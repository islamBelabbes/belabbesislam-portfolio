"use client";

import { DashboardSideBarProvider } from "@/hooks/useSideMenu";

const DashboardProvider = ({ children }: { children: React.ReactNode }) => {
  return <DashboardSideBarProvider>{children}</DashboardSideBarProvider>;
};

export default DashboardProvider;
