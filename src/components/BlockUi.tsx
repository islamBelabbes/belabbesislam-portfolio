"use client";
import { ClipLoader } from "react-spinners";
import { cn } from "@/lib/utils";

type Props = {
  children: React.ReactNode;
  classNames?: {
    container?: string;
    spinner?: string;
  };
  isBlock?: boolean;
};

function BlockUi({ children, classNames, isBlock }: Props) {
  return (
    <div
      className={cn("relative ", classNames?.container, {
        "cursor-not-allowed": isBlock,
      })}
    >
      {isBlock && (
        <div
          className={cn(
            "absolute z-50 flex items-center justify-center w-full h-full bg-black/30 dark:bg-white/30",
            classNames?.spinner
          )}
        >
          <ClipLoader color="#4B6BFB" />
        </div>
      )}

      {children}
    </div>
  );
}

export default BlockUi;
