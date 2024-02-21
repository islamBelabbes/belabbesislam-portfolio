import Contact from "@/components/Contact/Contact";
import Hero from "@/components/Hero/Hero";
import Projects from "@/components/Projects/Projects";
import Skills from "@/components/Skills/Skills";

export default function Home() {
  return (
    <>
      <section className="bg-WhitePrimary dark:bg-BlackPrimary py-10 min-h-[500px] flex items-center">
        <Hero />
      </section>

      <section className="bg-WhiteSecondary dark:bg-BlackSecondary py-10">
        <Skills />
      </section>

      <section className="bg-WhitePrimary dark:bg-BlackPrimary py-10">
        <Projects />
      </section>

      <section id="contact">
        <Contact />
      </section>
    </>
  );
}
