import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Users2Icon } from "lucide-react";
import { cn } from "@/lib/utils";
import { ProjectsTable } from "./tables/projectsTable/data-table";
import { CategoriesTable } from "./tables/categoriesTable/data-table";
import { columns as projectsColumns } from "./tables/projectsTable/columns";
import { categories, projects } from "@/seed";
import { columns } from "./tables/categoriesTable/columns";
import { Badge } from "@/components/ui/badge";

type DashboardStatusProps = {
  Icon: JSX.Element;
  iconBackground: string;
  status: number;
  title: string;
};

const Dashboard = () => {
  return (
    <div>
      <div className="flex gap-2 px-5">
        <DashboardStatus
          Icon={<Users2Icon color="#EC3263" />}
          iconBackground="bg-[#FFF5F7]"
          status={200}
          title="Total Users"
        />
        <DashboardStatus
          Icon={<Users2Icon color="#EC3263" />}
          iconBackground="bg-[#FFF5F7]"
          status={200}
          title="Total Users"
        />
        <DashboardStatus
          Icon={<Users2Icon color="#EC3263" />}
          iconBackground="bg-[#FFF5F7]"
          status={200}
          title="Total Users"
        />
        <DashboardStatus
          Icon={<Users2Icon color="#EC3263" />}
          iconBackground="bg-[#FFF5F7]"
          status={200}
          title="Total Users"
        />
      </div>
      <div className="mt-4 flex flex-col gap-3">
        <div className="flex flex-col gap-2">
          <Badge className="w-fit font-semibold text-sm">last Projects</Badge>
          <ProjectsTable columns={projectsColumns} data={projects} />
        </div>
        <div className="flex flex-col gap-2">
          <Badge className="w-fit font-semibold text-sm">last Categories</Badge>
          <CategoriesTable columns={columns} data={categories} />
        </div>
      </div>
    </div>
  );
};

const DashboardStatus = ({
  Icon,
  iconBackground,
  status,
  title,
}: DashboardStatusProps) => {
  return (
    <Card className="flex-1 rounded-xl border-transparent">
      <CardHeader className="items-center">
        <div className={cn("p-2 bg-[#FFF5F7] rounded-[6px]", iconBackground)}>
          {Icon}
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <p className="font-bold flex justify-center">{status}</p>
      </CardContent>
      <CardFooter className="items-center justify-center">
        <p>{title}</p>
      </CardFooter>
    </Card>
  );
};

export default Dashboard;
