import { TCategory } from "@/types";
import Image from "next/image";

type SkillProps = TCategory;

type SkillsListingProps = TCategory[];
function SkillsListing({ data }: { data: SkillsListingProps }) {
  return (
    <ul className="grid  grid-cols-[repeat(auto-fit,minmax(130px,1fr))] gap-x-3 gap-y-7 items-center ">
      {data.map((item) => (
        <Skill key={item.id} item={item} />
      ))}
    </ul>
  );
}

function Skill({ item: { image, name } }: { item: SkillProps }) {
  return (
    <li className="flex flex-col items-center justify-center gap-2">
      <Image
        className="object-contain h-full"
        src={image}
        alt={name}
        width={64}
        height={64}
      />
      <span>{name}</span>
    </li>
  );
}
export default SkillsListing;
