"use client";
import React, { useRef, useState } from "react";
import Navigation from "./Navigation";
import useIsSticky from "@/hooks/useIsSticky";
import { cn } from "@/lib/utils";

import DarkModeButton from "../DarkModeButton";
import SideMenu from "./SideMenu";
import { Menu, MenuSquare } from "lucide-react";
import { buttonVariants } from "../ui/button";

function Header() {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const headerRef = useRef<HTMLDivElement | null>(null);

  const isSticky = useIsSticky(headerRef);

  return (
    <header
      ref={headerRef}
      className={cn(
        "flex justify-center bg-WhiteSecondary dark:bg-BlackSecondary h-[80px] sticky top-0 w-full z-50",
        {
          "shadow-sm": isSticky,
        }
      )}
    >
      <div className="flex items-center justify-between lg:max-w-[1280px] w-full lg:px-[80px] py-[15px] p-3 ">
        <div>
          <a
            href="#hero"
            className="text-xl font-medium dark:text-WhitePrimary text-BlackPrimary "
          >
            BelabbesIslam.
          </a>
        </div>
        <div className="items-center hidden gap-6 lg:flex">
          <Navigation />
          <div className="flex items-center gap-6">
            <DarkModeButton />
            <a
              className={buttonVariants({ variant: "outline" })}
              href="#contact"
            >
              Lets Talk
            </a>
          </div>
        </div>
        <div className="w-10 lg:hidden">
          {!isOpen && (
            <button onClick={() => setIsOpen(true)}>
              <Menu />
            </button>
          )}
        </div>
      </div>

      {/* Side Menu */}
      <SideMenu isOpen={isOpen} setIsOpen={setIsOpen} />
    </header>
  );
}

export default Header;
