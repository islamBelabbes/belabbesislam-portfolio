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
      <div className="px-[33px] py-2 flex justify-end  items-center w-full gap-1">
        <div className="flex gap-2">
          <UserButton />
          <DashboardSideBarToggle />
        </div>
      </div>
    </header>
  );
}

export default DashboardHeader;
