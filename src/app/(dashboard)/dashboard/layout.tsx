import type { Metadata } from "next";
import DashboardSideBar from "@/components/Dashboard/DashboardSideBar";
import DashboardHeader from "@/components/Dashboard/DashboardHeader";
import DashboardProvider from "@/components/Dashboard/DashboardProvider";
import { HEADER_HEIGHT } from "@/constants/constants";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex row">
      <DashboardProvider>
        <DashboardSideBar />
        <main className="w-full z-10">
          <DashboardHeader />
          <div
            className="bg-[#f8f8f8]  lg:p-[25px]"
            style={{
              height: `calc(100vh - ${HEADER_HEIGHT}px)`,
            }}
          >
            <div className="bg-white w-full h-full p-3 overflow-y-scroll overflow-x-hidden">
              {children}
            </div>
          </div>
        </main>
      </DashboardProvider>
    </div>
  );
}
