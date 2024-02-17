import DarkModeButton from "@/components/DarkModeButton";
import { NAV_ITEMS } from "@/constants/constants";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
} from "@/components/ui/sheet";

type TSideMenuProps = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

function SideMenu({ isOpen, setIsOpen }: TSideMenuProps) {
  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetContent className="p-0 w-full lg:w-1/3">
        {/* menu items */}
        <nav className="flex flex-col gap-4 p-6 border-b dark:border-[#ffffff1f]">
          {NAV_ITEMS.map((item, index) => (
            <SheetClose asChild>
              <a key={index} href={`#${item.href}`}>
                {item.name}
              </a>
            </SheetClose>
          ))}
        </nav>

        {/* Theme Switcher */}
        <SheetFooter className="flex justify-between p-6 items-center flex-row">
          <span>switch Theme</span>
          <DarkModeButton />
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}

export default SideMenu;
