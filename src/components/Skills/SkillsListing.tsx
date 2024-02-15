import Image from "next/image";

type SkillProps = {
  logo: string;
  name: string;
};

type SkillsListingProps = {};
function SkillsListing() {
  return (
    <ul className="grid  grid-cols-[repeat(auto-fit,minmax(130px,1fr))] gap-x-3 gap-y-7 items-center ">
      {Array(10)
        .fill(0)
        .map((_, index) => (
          <Skill key={index} logo="/icon-postgresql.png" name="PostgreSQL" />
        ))}
    </ul>
  );
}

function Skill({ logo, name }: SkillProps) {
  return (
    <li className="flex flex-col items-center justify-center gap-2">
      <Image
        className="object-contain h-full"
        src={logo}
        alt={name}
        width={64}
        height={64}
      />
      <span>{name}</span>
    </li>
  );
}
export default SkillsListing;
