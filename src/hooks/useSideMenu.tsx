"use client";
import { createContext, useContext, useState } from "react";

type TSideMenuProviderProps = {
  isToggled: boolean;
  setIsToggled: React.Dispatch<React.SetStateAction<boolean>>;
  isCollapsed: boolean;
  setIsCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
};

const dashboardSideBarContext = createContext<TSideMenuProviderProps | null>(
  null
);

function useDashboardSideBar() {
  const context = useContext(dashboardSideBarContext);
  if (!context) {
    throw new Error("useSideMenu must be used within a SideMenuProvider");
  }

  return context;
}

export const DashboardSideBarProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isToggled, setIsToggled] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  const values = {
    isToggled,
    setIsToggled,
    isCollapsed,
    setIsCollapsed,
  };

  return (
    <dashboardSideBarContext.Provider value={values}>
      {children}
    </dashboardSideBarContext.Provider>
  );
};

export default useDashboardSideBar;
