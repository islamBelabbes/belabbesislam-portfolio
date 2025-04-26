import Projects from "./_components/Projects/Projects";
import FindMe from "./_components/find-me";
import GetInTouch from "./_components/get-in-touch";
import Hero from "./_components/hero";
import Skills from "./_components/skills";
import { getCategoriesUseCase } from "@/use-cases/category";

export default async function Home() {
  const skills = await getCategoriesUseCase({ showEmpty: true, limit: 100 });
  const categories = await getCategoriesUseCase({ limit: 100 });

  return (
    <>
      <Hero />
      <Skills skills={skills.data} />
      <Projects categories={categories.data} />
      <section id="contact">
        <GetInTouch />
        <FindMe />
      </section>
    </>
  );
}
