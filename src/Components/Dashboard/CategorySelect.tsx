import React, { useState } from "react";

import { Check, MousePointerSquare } from "lucide-react";

import { Popover, PopoverTrigger } from "@/components/ui/popover";
import {
  Command,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Button } from "@/components/ui/button";
import { TCategory } from "@/types";
import { cn } from "@/lib/utils";
import { categories } from "@/seed";
import { Dialog, DialogContent } from "@/components/ui/dialog";

type TSearchResult = {
  search: string;
  selectedCategory: TCategory | null;
  setSelectedCategory: (category: TCategory | null) => void;
};

const CategorySelect = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<TCategory | null>(
    null
  );

  const customSetSelectedCategory = (category: TCategory | null) => {
    if (selectedCategory?.id === category?.id) return setSelectedCategory(null);
    return setSelectedCategory(category);
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          className="w-full justify-between"
        >
          {selectedCategory ? (
            <span>{selectedCategory.name}</span>
          ) : (
            <span> Select Category...</span>
          )}

          <MousePointerSquare className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="p-0 border-0">
          <Command
            shouldFilter={false}
            className="border-0 rounded-none *:border-0 *:rounded-none"
          >
            <CommandInput
              placeholder="Search For Category..."
              onValueChange={setSearch}
              value={search}
            />
            <SearchResult
              search={search}
              selectedCategory={selectedCategory}
              setSelectedCategory={customSetSelectedCategory}
            />
          </Command>
        </DialogContent>
      </Dialog>
    </Popover>
  );
};

const SearchResult = ({
  search,
  selectedCategory,
  setSelectedCategory,
}: TSearchResult) => {
  const [res, setRes] = useState<TCategory[]>(categories);
  const [isLoading, setIsLoading] = useState(false);

  return (
    <CommandList>
      {isLoading && (
        <CommandItem className="__className_aaf875">Loading...</CommandItem>
      )}
      {!isLoading &&
        res.length > 0 &&
        res.map((item) => (
          <>
            <CommandItem
              data-current={selectedCategory?.id === item?.id}
              onSelect={() => setSelectedCategory(item)}
              className={cn("flex justify-between cursor-pointer p-3", {
                "bg-primary text-white rounded-none":
                  selectedCategory?.id === item?.id,
              })}
            >
              {item.name}
              {selectedCategory?.id === item?.id && <Check size={11} />}
            </CommandItem>
          </>
        ))}
    </CommandList>
  );
};

export default CategorySelect;
