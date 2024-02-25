"use client";
import { useQuery } from "@tanstack/react-query";
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

  const [placeHolder, setPlaceHolder] = useState<TProject[]>([]);

  const supabase = useMemo(() => {
    return createSupabaseClient();
  }, []);

  const { data, isLoading } = useQuery({
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

      const mappedData = data.map((item) => ({
        ...item,
        image: `${process.env.NEXT_PUBLIC_SUPABASE_MEDIA_URL}/projects/${item.image}`,
      }));

      setPlaceHolder(mappedData);
      return mappedData;
    },
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
      <BlockUi isBlock={isLoading} classNames={{ container: "w-full bg-red" }}>
        <ProjectsListing data={data || placeHolder} />
      </BlockUi>
    </div>
  );
}

export default Projects;
