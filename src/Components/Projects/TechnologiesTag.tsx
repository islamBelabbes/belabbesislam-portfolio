import React from "react";

function TechnologiesTag({ items }: { items: string[] }) {
  return (
    <div className="flex flex-wrap gap-2">
      {items.map((item, index) => (
        <div
          key={index}
          className="px-2 py-1 rounded bg-BlackSecondary dark:bg-WhitePrimary "
        >
          <span className="text-base dark:text-BlackSecondary text-WhiteSecondary">
            {item}
          </span>
        </div>
      ))}
    </div>
  );
}

export default TechnologiesTag;
