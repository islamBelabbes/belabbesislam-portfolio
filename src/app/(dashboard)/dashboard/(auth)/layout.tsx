import type { Metadata } from "next";
import DashboardSideBar from "@/components/Dashboard/DashboardSideBar";
import DashboardHeader from "@/components/Dashboard/DashboardHeader";
import { HEADER_HEIGHT } from "@/constants/constants";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { getCurrentUserUseCase } from "@/use-cases/user";
import { RedirectToSignIn } from "@clerk/nextjs";
import { DashboardSideBarProvider } from "@/hooks/useSideMenu";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Dashboard",
};

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // auth shouldn't be done in layout but its ok for this use case
  const user = await getCurrentUserUseCase();
  if (!user || !user.isAdmin) return <RedirectToSignIn />;

  return (
    <DashboardSideBarProvider>
      <div className="flex row">
        <DashboardSideBar />
        <div className="w-full z-10 overflow-hidden">
          <DashboardHeader />
          <main>
            <div
              className="bg-[#f8f8f8] lg:p-[25px]"
              style={{
                height: `calc(100vh - ${HEADER_HEIGHT}px)`,
              }}
            >
              <ScrollArea className="bg-white h-full w-full p-3" type="always">
                {children}
              </ScrollArea>
            </div>
          </main>
        </div>
      </div>
      <ReactQueryDevtools initialIsOpen={false} />
    </DashboardSideBarProvider>
  );
}
