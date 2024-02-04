"use client";
import React, { useRef, useState } from "react";
import Navigation from "./Navigation";
import useIsSticky from "@/hooks/useIsSticky";
import { cn } from "@/libs/utility";
import Image from "next/image";
import DarkModeButton from "../DarkModeButton";
import SideMenu from "./SideMenu";
import { AnimatePresence } from "framer-motion";

function Header() {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const headerRef = useRef<HTMLDivElement | null>(null);

  const isSticky = useIsSticky(headerRef);

  return (
    <header>
      <div
        ref={headerRef}
        className={cn(
          "flex justify-center bg-WhiteSecondary dark:bg-BlackSecondary h-[80px] fixed top-0 w-full z-50",
          {
            "shadow-sm transition-all  duration-500": isSticky,
          }
        )}
      >
        <div className="flex items-center justify-between lg:max-w-[1280px] w-full lg:px-[80px] py-[15px] p-3 ">
          <div>
            <span className="text-xl font-medium dark:text-WhitePrimary text-BlackPrimary ">
              BelabbesIslam.
            </span>
          </div>
          <div className="items-center hidden gap-6 lg:flex">
            <Navigation />
            <div className="flex items-center gap-6">
              <DarkModeButton />
              <a className={`button_primary select-none`} href="#contact">
                Lets Talk
              </a>
            </div>
          </div>
          <div className="w-10 lg:hidden">
            <SideMenuButton isOpen={isOpen} setIsOpen={setIsOpen} />
          </div>
        </div>
      </div>

      {/* Side Menu */}
      <AnimatePresence>
        {isOpen && <SideMenu closeModal={() => setIsOpen(false)} />}
      </AnimatePresence>
    </header>
  );
}

const SideMenuButton = ({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  if (isOpen)
    return (
      <button onClick={() => setIsOpen(false)}>
        <Image
          src="/menu_open.png"
          width={25}
          height={25}
          alt="close side menu"
        />
      </button>
    );

  return (
    <button onClick={() => setIsOpen(true)}>
      <Image src="/menu.svg" width={25} height={25} alt="open side menu" />
    </button>
  );
};
export default Header;
