"use client";
import { keepPreviousData, useInfiniteQuery } from "@tanstack/react-query";
import Categories from "./Categories";
import { useState } from "react";

import { ClipLoader } from "react-spinners";
import { Category } from "@/dto/categories";
import SectionEntry from "@/components/SectionEntry";
import BlockUi from "@/components/BlockUi";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import CategoriesTag from "@/components/CategoriesTag";
import { cn } from "@/lib/utils";
import { getProjects } from "@/lib/api";
import { Project } from "@/dto/projects";
import { MEDIA_URL } from "@/constants/constants";

function Projects({ categories }: { categories: Category[] }) {
  const [selectedCategory, setSelectedCategory] = useState<Category>(
    categories[0]
  );

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
      return getProjects({
        page: pageParam,
        categoryId: selectedCategory.id,
      });
    },

    placeholderData: keepPreviousData,
    getNextPageParam: (lastPage, _, lastPageParam) => {
      if (!lastPage.hasNext) return undefined;
      return lastPageParam + 1;
    },
    initialPageParam: 1,
  });

  const projects = data?.pages.reduce<Project[]>((acc, item) => {
    return [...acc, ...item.data];
  }, []);

  return (
    <section
      className="bg-WhitePrimary dark:bg-BlackPrimary py-10"
      id="projects"
    >
      <div className="lg:max-w-[1280px] mx-auto px-8 flex flex-col gap-12  justify-center items-center">
        <SectionEntry
          heading="Projects"
          description="Some Of The Projects i have done:"
          variant="Secondary"
        />
        <Categories
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          categories={categories}
        />
        <BlockUi
          isBlock={isLoading || isPlaceholderData}
          classNames={{ container: "w-full" }}
        >
          <div className="grid grid-cols-[1fr] lg:grid-cols-[repeat(2,1fr)] gap-x-7 gap-y-5 w-full items-center auto-cols-auto">
            {projects?.map((item) => (
              <div
                className="shadow_sm  rounded-[32px] flex flex-col transition-all duration-300 h-full"
                key={item.id}
              >
                <div
                  className="w-full flex relative"
                  style={{ minHeight: "356px" }}
                >
                  <Image
                    src={`${MEDIA_URL}/${item.image}`}
                    alt="project"
                    fill
                    className="object-cover rounded-t-[32px] lg:hover:rounded-b-[32px] lg:hover:scale-110 transition-all duration-300 cursor-pointer"
                  />
                </div>
                <div className="p-6  bg-WhiteSecondary dark:bg-BlackSecondary rounded-b-[32px] flex flex-col gap-4 h-full ">
                  <span className="text-xl leading-8 text-BlackSecondary dark:text-WhiteSecondary">
                    {item.title}
                  </span>
                  <p className="text-base font-normal text-BlackSecondary dark:text-WhiteSecondary ">
                    {item.description}
                  </p>

                  <div className="flex flex-col gap-4 mt-auto">
                    <div className="flex flex-wrap gap-2">
                      {item.categories.map((category) => (
                        <CategoriesTag item={category} key={category.id} />
                      ))}
                    </div>

                    <a
                      className={cn("flex gap-3", {
                        "cursor-not-allowed opacity-40": !item.url,
                      })}
                      href={item.url || "#"}
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
              </div>
            ))}
          </div>
          {Boolean(projects?.length) && hasNextPage && (
            <Button onClick={() => fetchNextPage()} className="w-full mt-3">
              {isFetchingNextPage ? (
                <ClipLoader color="blue" size={24} />
              ) : (
                "Load More"
              )}
            </Button>
          )}
        </BlockUi>
      </div>
    </section>
  );
}

export default Projects;
