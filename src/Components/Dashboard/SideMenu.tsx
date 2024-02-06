import DashboardNav from "./DashboardNav";
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";

function SideMenu() {
  return (
    <aside className="min-h-screen bg-white min-w-[300px] w-fit px-4">
      <div className="h-[120px] flex items-center">
        <span className="text-xl font-medium dark:text-WhitePrimary text-BlackPrimary w-full flex justify-center">
          BelabbesIslam.
        </span>
      </div>

      <DashboardNav />
    </aside>
  );
}

export default SideMenu;
