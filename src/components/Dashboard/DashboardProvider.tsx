"use client";

import { DashboardSideBarProvider } from "@/hooks/useSideMenu";
import { ClerkProvider } from "@clerk/nextjs";

const DashboardProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <ClerkProvider>
      <DashboardSideBarProvider>{children}</DashboardSideBarProvider>
    </ClerkProvider>
  );
};

export default DashboardProvider;
