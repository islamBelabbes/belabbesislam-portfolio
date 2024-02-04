import React from "react";

import SectionEntry from "@/Components/SectionEntry";
import SkillsListing from "./SkillsListing";

function Skills() {
  return (
    <div className="bg-WhiteSecondary dark:bg-BlackSecondary py-10">
      <div className="lg:max-w-[1280px] mx-auto px-8" id="skills">
        <div className="flex flex-col gap-12  justify-center items-center">
          <SectionEntry
            heading="Skills"
            description="The skills , tools and technologies i am really good at:"
          />

          <div className="w-full">
            <SkillsListing />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Skills;
