"use client";

import Image from "next/image";

import { useTheme } from "next-themes";
function DarkModeButton() {
  const { theme, setTheme } = useTheme();
  return (
    <div className="flex justify-end ">
      {theme === "light" ? (
        <div className="cursor-pointer" onClick={() => setTheme("dark")}>
          <Image
            src={"/theme.png"}
            width={24}
            height={24}
            alt="turn on darkmode"
          />
        </div>
      ) : (
        <div className="cursor-pointer" onClick={() => setTheme("light")}>
          <Image
            src={"/theme.png"}
            width={24}
            height={24}
            alt="turn off darkmode"
            className="white_filter"
          />
        </div>
      )}
    </div>
  );
}

export default DarkModeButton;
