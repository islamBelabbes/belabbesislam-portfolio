import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

type DashboardStatusProps = {
  Icon: React.JSX.Element;
  iconBackground: string;
  status: number;
  title: string;
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

export default DashboardStatus;
