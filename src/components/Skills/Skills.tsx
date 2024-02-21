import React from "react";

import SectionEntry from "@/components/SectionEntry";
import SkillsListing from "./SkillsListing";

function Skills() {
  return (
    <div className="lg:max-w-[1280px] mx-auto px-8" id="skills">
      <div className="flex flex-col gap-12  justify-center items-center">
        <SectionEntry
          heading="Skills"
          description="The skills , tools and categories i am really good at:"
        />

        <div className="w-full">
          <SkillsListing />
        </div>
      </div>
    </div>
  );
}

export default Skills;
