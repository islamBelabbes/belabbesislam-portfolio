import SectionEntry from "../SectionEntry";
import Categories from "./Categories";
import ProjectsListing from "./ProjectsListing";

function Projects() {
  return (
    <section className="bg-WhitePrimary dark:bg-BlackPrimary py-10">
      <div
        id="projects"
        className="lg:max-w-[1280px] mx-auto px-8 flex flex-col gap-12  justify-center items-center"
      >
        <SectionEntry
          heading="Projects"
          description="Some Of The Projects i have done:"
          variant="Secondary"
        />
        <Categories />
        <ProjectsListing />
      </div>
    </section>
  );
}

export default Projects;
