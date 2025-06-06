import React from "react";

import SectionEntry from "@/components/SectionEntry";
import { MEDIA_URL } from "@/constants/constants";
import Image from "next/image";
import { Category } from "@/dto/categories";

async function Skills({ skills }: { skills: Category[] }) {
  return (
    <section
      className="bg-WhiteSecondary dark:bg-BlackSecondary py-10"
      id="skills"
    >
      <div className="lg:max-w-[1280px] mx-auto px-8">
        <div className="flex flex-col gap-12  justify-center items-center">
          <SectionEntry
            heading="Skills"
            description="The skills , tools and categories i am really good at:"
          />

          <div className="w-full">
            <ul className="grid  grid-cols-[repeat(auto-fit,minmax(130px,1fr))] gap-x-3 gap-y-7 items-center ">
              {skills.map((item) => (
                <li
                  className="flex flex-col items-center justify-center gap-2 capitalize"
                  key={item.id}
                >
                  <div className="w-[64px] h-[64px] relative">
                    <Image
                      className="object-contain"
                      src={`${MEDIA_URL}/${item.image}`}
                      alt={item.name}
                      fill
                    />
                  </div>
                  <span>{item.name}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Skills;
