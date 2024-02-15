import React from "react";

function Hero() {
  return (
    <section className="bg-WhitePrimary dark:bg-BlackPrimary py-10 mt-[80px] min-h-[500px] flex items-center">
      <div
        id="hero"
        className="lg:max-w-[1280px] mx-auto px-8 flex flex-col gap-12  justify-center items-center"
      >
        <p className="lg:text-5xl text-3xl text-center leading-[1.5] font-medium text-balance lg:leading-[1.3]  ">
          <span className="text-[#B16CEA]">Hello , I&apos;m Islam</span> , A Web
          Developer
        </p>
        <div className="flex flex-col w-full gap-3 lg:flex-row lg:w-auto">
          <a className="button_primary capitalize text-center" href="#contact">
            get in touch
          </a>
          <a
            className="button_secondary capitalize text-center"
            href="#projects"
          >
            view all works
          </a>
        </div>
      </div>
    </section>
  );
}

export default Hero;
