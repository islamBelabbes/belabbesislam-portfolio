"use client";
import React from "react";
import Overlay from "./Overlay";
import Image from "next/image";
import { motion } from "framer-motion";
function SideModal({ children }: { children: JSX.Element[] | JSX.Element }) {
  return (
    <Overlay>
      <motion.div
        initial={{ translateX: "100vw", opacity: 0 }}
        animate={{ translateX: 0, opacity: 1 }}
        exit={{ translateX: "100vw", opacity: 0 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        className="w-[100%] md:w-[20%] h-screen fixed right-0 bg-white  dark:bg-[#161513] p-3 flex items-center"
      >
        <div className="h-[90%] w-full overflow-y-auto">{children}</div>
      </motion.div>
    </Overlay>
  );
}

export default SideModal;
