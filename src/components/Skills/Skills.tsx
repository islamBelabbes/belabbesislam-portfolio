import React from "react";

import SectionEntry from "@/components/SectionEntry";
import SkillsListing from "./SkillsListing";
import { createSupabaseClient } from "@/lib/supabase";

async function Skills() {
  const supabase = createSupabaseClient();
  const { data, error } = await supabase.from("categories").select(`*`);

  if (error) {
    console.log(error);
    throw new Error("Something went wrong");
  }

  const mappedData = data.map((item) => ({
    ...item,
    image: `${process.env.NEXT_PUBLIC_SUPABASE_MEDIA_URL}/categories/${item.image}`,
  }));
  return (
    <div className="lg:max-w-[1280px] mx-auto px-8" id="skills">
      <div className="flex flex-col gap-12  justify-center items-center">
        <SectionEntry
          heading="Skills"
          description="The skills , tools and categories i am really good at:"
        />

        <div className="w-full">
          <SkillsListing data={mappedData} />
        </div>
      </div>
    </div>
  );
}

export default Skills;
