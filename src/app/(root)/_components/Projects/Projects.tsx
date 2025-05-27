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
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { ArrowRight, ExternalLink } from "lucide-react";
import { Github } from "@/components/ui/icons";
import { ScrollArea } from "@/components/ui/scroll-area";

function Projects({ categories }: { categories: Category[] }) {
  const [selectedCategory, setSelectedCategory] = useState<
    Category | undefined
  >(undefined);

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
        categoryId: selectedCategory?.id,
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

  const handleCategorySelect = (category: Category) => {
    const selected =
      selectedCategory?.id === category.id ? undefined : category;
    setSelectedCategory(selected);
  };

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
          setSelectedCategory={handleCategorySelect}
          categories={categories}
        />
        <BlockUi
          isBlock={isLoading || isPlaceholderData}
          classNames={{ container: "w-full" }}
        >
          <div className="grid grid-cols-[1fr] lg:grid-cols-[repeat(2,1fr)] gap-x-7 gap-y-5 w-full items-center auto-cols-auto">
            {projects?.map((item) => (
              <ProjectItem {...item} key={item.id} />
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

const ProjectItem = (item: Project) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };
  return (
    <div
      className="shadow_sm  rounded-[32px] flex flex-col transition-all duration-300 h-full"
      key={item.id}
    >
      <div
        className="w-full flex relative min-h-[300px] md:min-h-[360px]"
        role="button"
        onClick={handleOpen}
      >
        <Image
          src={`${MEDIA_URL}/${item.image}`}
          alt="project"
          fill
          className="object-fill md:object-cover rounded-t-[32px] lg:hover:rounded-b-[32px] lg:hover:scale-110 transition-all duration-300 cursor-pointer"
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

          <Button
            className="flex gap-2 w-fit"
            onClick={handleOpen}
            variant="ghost"
          >
            View Project
            <ArrowRight />
          </Button>

          <Drawer open={open} onOpenChange={setOpen}>
            <DrawerContent className="p-2">
              <ScrollArea className="lg:h-[calc(100vh-6rem)] h-[calc(100vh-3rem)]">
                <div className="px-5 items-center flex flex-col gap-2">
                  <DrawerHeader className="justify-center items-center gap-3 sticky top-0 z-50 bg-white dark:bg-transparent w-full border-none">
                    <div>
                      <DrawerTitle className="text-center text-2xl">
                        {item.title}
                      </DrawerTitle>
                      <div className="items-center flex gap-1">
                        <DrawerDescription>
                          {item.description}
                        </DrawerDescription>
                        {item.url && (
                          <a href={item.url} target="_blank">
                            <ExternalLink size={20} />
                          </a>
                        )}
                        <a href="" target="_blank">
                          <Github size={20} />
                        </a>
                      </div>
                    </div>
                  </DrawerHeader>
                  <div className="relative  h-[300px] md:h-[700px] max-w-6xl w-full shrink-0 ">
                    <Image
                      src={`${MEDIA_URL}/${item.image}`}
                      alt="project"
                      fill
                      className="object-fill md:object-cover rounded-t-[32px] "
                    />
                  </div>

                  {/* gallery */}
                  <div className="flex mt-2 gap-2 flex-col max-w-6xl">
                    {item.gallery.map((item) => (
                      <img
                        key={item.id}
                        src={`${MEDIA_URL}/${item.image}`}
                        alt="project gallery"
                        className="rounded-[32px] border border-transparent"
                      />
                    ))}
                  </div>
                </div>
              </ScrollArea>
            </DrawerContent>
          </Drawer>
        </div>
      </div>
    </div>
  );
};

export default Projects;
