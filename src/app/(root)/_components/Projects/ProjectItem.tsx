"use client";
import { motion } from "framer-motion";
import CategoriesTag from "@/components/CategoriesTag";
import Image from "next/image";
import { TCategory, TProject } from "@/types";
import { cn } from "@/lib/utils";
function ProjectItem({
  item: { categories, image, title, url, description },
}: {
  item: TProject;
}) {
  return (
    <motion.div className="shadow_sm  rounded-[32px] flex flex-col transition-all duration-300 h-full">
      <div className="w-full flex relative" style={{ minHeight: "356px" }}>
        <Image
          src={image}
          alt="project"
          fill
          className="object-cover rounded-t-[32px] lg:hover:rounded-b-[32px] lg:hover:scale-110 transition-all duration-300 cursor-pointer"
        />
      </div>
      <div className="p-6  bg-WhiteSecondary dark:bg-BlackSecondary rounded-b-[32px] flex flex-col gap-4 h-full ">
        <span className="text-xl leading-8 text-BlackSecondary dark:text-WhiteSecondary">
          {title}
        </span>
        <p className="text-base font-normal text-BlackSecondary dark:text-WhiteSecondary ">
          {description}
        </p>

        <div className="flex flex-col gap-4 mt-auto">
          <div className="flex flex-wrap gap-2">
            {categories.map((item) => (
              <CategoriesTag item={item} key={item.id} />
            ))}
          </div>

          <a
            className={cn("flex gap-3", {
              "cursor-not-allowed opacity-40": !url,
            })}
            href={url || ""}
            target="_blank"
          >
            View Project
            <Image
              width={20}
              height={20}
              className="white_filter inline-block"
              src="/right-arrow.png"
              alt="right arrow"
            />
          </a>
        </div>
      </div>
    </motion.div>
  );
}
export default ProjectItem;
