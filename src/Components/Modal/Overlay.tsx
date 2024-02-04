"use client";
import { cn } from "@/libs/utility";
import { type ClassValue } from "clsx";
import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";

type overlayProps = {
  children: JSX.Element[] | JSX.Element;
  className?: ClassValue;
  onClickOutside?: () => void;
  animate?: boolean;
};

const variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
};

function Overlay({ children, className, onClickOutside }: overlayProps) {
  return (
    <WithPortal elementId="modal">
      <motion.div
        onClick={onClickOutside}
        className={cn("overlay", className, {
          "cursor-pointer": onClickOutside,
        })}
        variants={variants}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        {children}
      </motion.div>
    </WithPortal>
  );
}

type WithPortalProps = {
  children: JSX.Element[] | JSX.Element;
  elementId: string;
};
const WithPortal = ({ children, elementId }: WithPortalProps) => {
  const domNode = document.getElementById(elementId);
  if (domNode) return createPortal(children, domNode);
  return null;
};

export default Overlay;
