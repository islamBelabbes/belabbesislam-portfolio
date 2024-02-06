import React from "react";
import SectionEntry from "../SectionEntry";

type findData = {
  to: string;
  logo: string;
};
const FIND: findData[] = [
  {
    to: "#",
    logo: "/Mostaql-Logo.png",
  },
  {
    to: "#",
    logo: "/Picalica-Logo.png",
  },
  {
    to: "#",
    logo: "/github-Logo.png",
  },
];
function FindMe() {
  return (
    <section className="bg-WhitePrimary dark:bg-BlackPrimary py-10">
      <div className="lg:max-w-[1280px] mx-auto px-8 flex flex-col gap-7  justify-center items-center">
        <SectionEntry
          heading={"Find Me"}
          description={"You Can Find Me On :"}
          variant={"Secondary"}
        />
        <ul className="flex flex-wrap justify-center gap-3 ">
          {FIND.map((item, index) => (
            <li className="lg:w-[9rem] w-[90px]" key={index}>
              <a target="_blank" href={item.to}>
                <img
                  className="object-contain w-full h-full white_filter"
                  src={item.logo}
                />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default FindMe;
