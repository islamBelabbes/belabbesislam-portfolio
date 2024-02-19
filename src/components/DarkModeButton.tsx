// "use client";

// import Image from "next/image";

// import { useTheme } from "next-themes";
// function DarkModeButton() {
//   const { theme, setTheme } = useTheme();
//   return (
//     <div className="flex justify-end ">
//       {theme === "light" ? (
//         <div className="cursor-pointer" onClick={() => setTheme("dark")}>
//           <Image
//             src={"/theme.png"}
//             width={24}
//             height={24}
//             alt="turn on darkmode"
//           />
//         </div>
//       ) : (
//         <div className="cursor-pointer" onClick={() => setTheme("light")}>
//           <Image
//             src={"/theme.png"}
//             width={24}
//             height={24}
//             alt="turn off darkmode"
//             className="white_filter"
//           />
//         </div>
//       )}
//     </div>
//   );
// }

"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function DarkModeButton() {
  const { setTheme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme("light")}>
          Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")}>
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default DarkModeButton;
