import React from "react";
import SideModal from "../Modal/SideModal";
import DarkModeButton from "../DarkModeButton";
import Image from "next/image";
import { NAV_ITEMS } from "@/constants/constants";
function SideMenu({ closeModal }: { closeModal: () => void }) {
  return (
    <SideModal>
      <div className="flex justify-between p-6  border-b dark:border-[#ffffff1f]">
        {/* Logo */}
        <span className="text-xl font-medium dark:text-WhitePrimary text-BlackPrimary ">
          BelabbesIslam.
        </span>

        {/* close modal button */}
        <button
          onClick={closeModal}
          className="absolute top-0 right-0 translate-x-[-20px] translate-y-[20px] cursor-pointer"
        >
          <Image
            src={"/close.png"}
            width={24}
            height={24}
            alt="close"
            className="white_filter"
          />
        </button>
      </div>

      {/* menu items */}
      <ul className="flex flex-col gap-4 p-6 border-b dark:border-[#ffffff1f]">
        {NAV_ITEMS.map((item, index) => (
          <li key={index} className={item.href} onClick={closeModal}>
            <a href={`#${item.href}`}>{item.name}</a>
          </li>
        ))}
      </ul>

      {/* Theme Switcher */}
      <label className="flex justify-between p-6">
        <span>switch Theme</span>
        <DarkModeButton />
      </label>
    </SideModal>
  );
}

export default SideMenu;
