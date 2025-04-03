import React from "react";
import ProjectItem from "./ProjectItem";
import { TProject } from "@/types";

function ProjectsListing({ data }: { data: TProject[] }) {
  return (
    <div className="grid grid-cols-[1fr] lg:grid-cols-[repeat(2,1fr)] gap-x-7 gap-y-5 w-full items-center auto-cols-auto">
      {data.map((item) => (
        <ProjectItem key={item.id} item={item} />
      ))}
    </div>
  );
}

export default ProjectsListing;
