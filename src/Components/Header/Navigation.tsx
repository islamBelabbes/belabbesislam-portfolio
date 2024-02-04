import { NAV_ITEMS } from "@/constants/constants";

function Navigation() {
  return (
    <ul className="flex gap-6 border-r select-none pr-7 dark:text-WhitePrimary text-BlackPrimary dark:border-WhiteSecondary border-BlackSecondary ">
      {NAV_ITEMS.map((item, index) => {
        return (
          <li key={index} className={item.href}>
            <a href={`#${item.href}`}>{item.name}</a>
          </li>
        );
      })}
    </ul>
  );
}

export default Navigation;
