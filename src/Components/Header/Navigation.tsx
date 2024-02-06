import { NAV_ITEMS } from "@/constants/constants";

function Navigation() {
  return (
    <nav className="flex gap-6 border-r select-none pr-7 dark:text-WhitePrimary text-BlackPrimary dark:border-WhiteSecondary border-BlackSecondary ">
      {NAV_ITEMS.map((item, index) => {
        return (
          <a key={index} href={`#${item.href}`}>
            {item.name}
          </a>
        );
      })}
    </nav>
  );
}

export default Navigation;
