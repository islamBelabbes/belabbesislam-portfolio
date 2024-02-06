import React from "react";
import { Input } from "../ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Search } from "lucide-react";
import { Button } from "../ui/button";

function Header() {
  return (
    <header className="w-full h-[120px]  py-[36px] bg-white">
      <div className="px-[33px] flex justify-between items-center">
        <div className="flex gap-3">
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
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
}

export default Header;
