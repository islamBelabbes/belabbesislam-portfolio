"use client";
import React from "react";

import { Search } from "lucide-react";
import { UserButton } from "@clerk/nextjs";

import { Input } from "../ui/input";
import { Button } from "../ui/button";
import DashboardSideBarToggle from "./DashboardSideBarToggle";
import { HEADER_HEIGHT } from "@/constants/constants";

function DashboardHeader() {
  return (
    <header
      className="w-full h-[60px] bg-white flex justify-center items-center"
      style={{
        height: `${HEADER_HEIGHT}px`,
      }}
    >
      <div className="px-[33px] py-2 flex justify-end lg:justify-between items-center w-full gap-1">
        <div className="gap-3 hidden lg:flex">
          <div className="relative">
            <Search
              className="absolute top-[50%] left-2 translate-y-[-50%] "
              size={16}
            />
            <Input
              className="w-[280px] focus-visible:ring-0  px-7 focus-visible:ring-offset-0"
              placeholder="Search..."
            />
          </div>
          <Button>Search</Button>
        </div>
        <div className="flex gap-2">
          <UserButton />
          <DashboardSideBarToggle />
        </div>
      </div>
    </header>
  );
}

export default DashboardHeader;
