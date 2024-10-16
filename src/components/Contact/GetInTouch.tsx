"use client";
import React, { useState } from "react";
import SectionEntry from "../SectionEntry";
import { Check, Copy, Mail, Phone } from "lucide-react";

const CONTACT = [
  {
    detail: "belabbesislam2@gmail.com",
    Icon: Mail,
  },
  {
    detail: "+213 667749742",
    Icon: Phone,
  },
];

function GetInTouch() {
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
                <item.Icon height={30} />
                <p>{item.detail}</p>

                <CopyButton detail={item.detail} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

const CopyButton = ({ detail }: { detail: string }) => {
  const [hasCopied, setHasCopied] = useState(false);

  const copyHandler = (text: string) => {
    if (hasCopied) return;
    navigator.clipboard.writeText(text);
    setHasCopied(true);
    setTimeout(() => {
      setHasCopied(false);
    }, 500);
  };
  return (
    <button onClick={() => copyHandler(detail)}>
      {hasCopied ? <Check height={30} /> : <Copy height={30} />}
    </button>
  );
};

export default GetInTouch;
