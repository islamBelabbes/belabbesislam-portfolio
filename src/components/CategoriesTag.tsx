import { TCategory } from "@/types";
import React from "react";

function CategoriesTag({ item }: { item: TCategory }) {
  return (
    <div className="px-2 py-1 rounded bg-BlackSecondary dark:bg-WhitePrimary ">
      <span className="text-base dark:text-BlackSecondary text-WhiteSecondary">
        {item.name}
      </span>
    </div>
  );
}

export default CategoriesTag;
