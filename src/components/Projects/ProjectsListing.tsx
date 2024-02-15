import React from "react";
import ProjectItem from "./ProjectItem";

function ProjectsListing() {
  return (
    <div className="grid grid-cols-[1fr] lg:grid-cols-[repeat(2,1fr)] gap-x-7 gap-y-5 w-full items-center auto-cols-auto">
      {Array(5)
        .fill(0)
        .map((_, index) => (
          <ProjectItem key={index} />
        ))}
    </div>
  );
}

export default ProjectsListing;
