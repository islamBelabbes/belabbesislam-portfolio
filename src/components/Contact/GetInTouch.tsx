"use client";
import React from "react";
import SectionEntry from "../SectionEntry";
import { toast } from "react-toastify";
import Image from "next/image";

const CONTACT = [
  {
    detail: "belabbesislam2@gmail.com",
    icon: "/email.png",
  },
  {
    detail: "+213 667749742",
    icon: "/phone.png",
  },
];

function GetInTouch() {
  const copyHandler = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Text Copied successfully", { autoClose: 1000 });
  };

  return (
    <section className="bg-WhiteSecondary dark:bg-BlackSecondary py-10">
      <div className="lg:max-w-[1280px] mx-auto px-8 flex flex-col gap-7  justify-center items-center">
        <SectionEntry
          heading="Get in Touch"
          description="you can contact me on:"
        />
        <div>
          <ul className="flex flex-col gap-4">
            {CONTACT.map((item) => (
              <li
                key={item.detail}
                className="flex items-center justify-center w-full gap-5"
              >
                <Image src={item.icon} width={30} height={30} alt="copy" />
                <p>{item.detail}</p>

                <button onClick={() => copyHandler(item.detail)}>
                  <Image src="/copy.png" width={30} height={30} alt="copy" />
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

export default GetInTouch;
