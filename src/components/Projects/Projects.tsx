"use client";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import SectionEntry from "../SectionEntry";
import Categories from "./Categories";
import ProjectsListing from "./ProjectsListing";
import { createSupabaseClient } from "@/lib/supabase";
import { useMemo, useState } from "react";
import { TCategory, TProject } from "@/types";
import BlockUi from "../BlockUi";

function Projects() {
  const [selectedCategory, setSelectedCategory] = useState<TCategory | null>(
    null
  );

  const supabase = useMemo(() => createSupabaseClient(), []);

  const { data, isLoading, isPlaceholderData } = useQuery({
    queryKey: ["projects", selectedCategory],
    queryFn: async () => {
      const query = supabase.from("projects").select(
        `
      * , selected:categories!inner(*) , categories:categories(*)
    `
      );

      if (selectedCategory) {
        query.eq("categories.id", selectedCategory.id);
      }

      const { data, error } = await query;

      if (error) throw new Error("Something went wrong");

      return data.map((item) => ({
        ...item,
        image: `${process.env.NEXT_PUBLIC_SUPABASE_MEDIA_URL}/projects/${item.image}`,
      }));
    },
    placeholderData: keepPreviousData,
  });

  return (
    <div
      id="projects"
      className="lg:max-w-[1280px] mx-auto px-8 flex flex-col gap-12  justify-center items-center"
    >
      <SectionEntry
        heading="Projects"
        description="Some Of The Projects i have done:"
        variant="Secondary"
      />
      <Categories
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />
      <BlockUi
        isBlock={isLoading || isPlaceholderData}
        classNames={{ container: "w-full" }}
      >
        <ProjectsListing data={data || []} />
      </BlockUi>
    </div>
  );
}

export default Projects;
