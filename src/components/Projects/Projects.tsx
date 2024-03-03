"use client";
import {
  keepPreviousData,
  useInfiniteQuery,
  useQuery,
} from "@tanstack/react-query";
import SectionEntry from "../SectionEntry";
import Categories from "./Categories";
import ProjectsListing from "./ProjectsListing";
import { createSupabaseClient } from "@/lib/supabase";
import { useMemo, useState } from "react";
import { TCategory, TProject } from "@/types";
import BlockUi from "../BlockUi";
import { Button } from "../ui/button";
import { ClipLoader } from "react-spinners";

const limit = 4;

type TLoadMoreButtonProps = {
  isFetchingNextPage: boolean;
  fetchNextPage: () => void;
};

function Projects() {
  const [selectedCategory, setSelectedCategory] = useState<TCategory | null>(
    null
  );

  const supabase = useMemo(() => createSupabaseClient(), []);

  const {
    data,
    isLoading,
    isPlaceholderData,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["projects", selectedCategory],
    queryFn: async ({ pageParam }) => {
      const query = supabase
        .from("projects")
        .select(
          `
      * , selected:categories!inner(*) , categories:categories(*)
    `,
          { count: "exact" }
        )
        .range((pageParam - 1) * limit, pageParam * limit - 1)
        .order("created_at", { ascending: false });

      if (selectedCategory) {
        query.eq("categories.id", selectedCategory.id);
      }

      const { data, error, count } = await query;

      if (error) throw new Error("Something went wrong");

      return {
        data: data.map((item) => ({
          ...item,
          image: `${process.env.NEXT_PUBLIC_SUPABASE_MEDIA_URL}/projects/${item.image}`,
        })),
        page: pageParam,
        hasNext: pageParam * limit < (count || 0),
      };
    },

    placeholderData: keepPreviousData,
    getNextPageParam: (lastPage) => {
      return lastPage.hasNext ? lastPage.page + 1 : undefined;
    },
    initialPageParam: 1,
  });

  const projects = data?.pages.reduce((acc, item) => {
    return [...acc, ...item.data];
  }, [] as TProject[]);

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
        <ProjectsListing data={projects || []} />

        {projects && hasNextPage && (
          <LoadMoreButton
            fetchNextPage={fetchNextPage}
            isFetchingNextPage={isFetchingNextPage}
          />
        )}
      </BlockUi>
    </div>
  );
}

const LoadMoreButton = ({
  fetchNextPage,
  isFetchingNextPage,
}: TLoadMoreButtonProps) => {
  return (
    <Button onClick={() => fetchNextPage()} className="w-full mt-3">
      {isFetchingNextPage ? <ClipLoader color="blue" size={24} /> : "Load More"}
    </Button>
  );
};

export default Projects;
