import { Category } from "@/dto/categories";
import { X } from "lucide-react";
import React from "react";

type TCategoriesTag = {
  item: Category;
  isRemovable?: null | undefined;
};

type TCategoriesTagRemovable = {
  isRemovable: true;
  onRemove: () => void;
  item: Category;
};

type TCategoriesTagProps = TCategoriesTag | TCategoriesTagRemovable;

function CategoriesTag(props: TCategoriesTagProps) {
  return (
    <div className="px-2 py-1 rounded bg-BlackSecondary dark:bg-WhitePrimary flex gap-1 items-center">
      <span className="text-base dark:text-BlackSecondary text-WhiteSecondary">
        {props.item.name}
      </span>

      {props.isRemovable ? (
        <X
          onClick={(e) => {
            e.stopPropagation();
            return props.onRemove();
          }}
          color="white"
          size={20}
        />
      ) : null}
    </div>
  );
}

export default CategoriesTag;
