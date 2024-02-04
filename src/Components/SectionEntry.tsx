import { cn } from "@/libs/utility";

import { type ClassValue } from "clsx";

type SectionEntryVARIANTS = {
  Primary: ClassValue;
  Secondary: ClassValue;
};

type SectionEntryProps = {
  heading: string;
  description: string;
  variant?: keyof SectionEntryVARIANTS;
};

const VARIANTS: SectionEntryVARIANTS = {
  Primary: "bg-WhitePrimary dark:bg-BlackPrimary",
  Secondary: "bg-WhiteSecondary dark:bg-BlackSecondary",
};

function SectionEntry({
  heading,
  description,
  variant = "Primary",
}: SectionEntryProps) {
  return (
    <div className="flex flex-col items-center gap-4">
      <span className={cn("px-5 py-1 border rounded-xl", VARIANTS[variant])}>
        {heading}
      </span>
      {description && <p className="text-center">{description}</p>}
    </div>
  );
}

export default SectionEntry;
