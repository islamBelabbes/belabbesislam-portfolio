"use client";

import SectionEntry from "@/components/SectionEntry";
import { useTheme } from "next-themes";

import Image from "next/image";

type findData = {
  to: string;
  logo: string;
  logo_dark?: string;
};
const FIND: findData[] = [
  {
    to: "https://mostaql.com/u/islamalg",
    logo: "/Mostaql-Logo.png",
  },
  {
    to: "https://picalica.com/u/islam_belabbes",
    logo: "/Picalica-Logo.png",
  },
  {
    to: "https://github.com/islamBelabbes",
    logo: "/Github-Logo-dark.png",
    logo_dark: "/Github-Logo.png",
  },
];
function FindMe() {
  const { theme } = useTheme();

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
            <li key={index}>
              <a
                target="_blank"
                href={item.to}
                className="lg:w-[9rem] w-[90px] relative block aspect-video"
              >
                <Image
                  className="object-contain w-full h-full"
                  src={
                    theme === "dark" && item.logo_dark
                      ? item.logo_dark
                      : item.logo
                  }
                  fill
                  alt={item.logo}
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
