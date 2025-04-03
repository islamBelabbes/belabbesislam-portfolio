import { Contact } from "lucide-react";
import Projects from "./_components/Projects/Projects";
import Hero from "./_components/hero";
import Skills from "./_components/skills";
import { getCategoriesUseCase } from "@/use-cases/category";

export default async function Home() {
  const skills = await getCategoriesUseCase({ showEmpty: false });
  const categories = await getCategoriesUseCase();
  return (
    <>
      <Hero />
      <Skills skills={skills.data} />
      <Projects categories={categories.data} />
      <section id="contact">
        <Contact />
      </section>
    </>
  );
}
