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
import { cn, isInSelectedCategories } from "@/lib/utils";
import { categories } from "@/seed";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { ScrollArea } from "../ui/scroll-area";
import categoriesTag from "../Projects/categoriesTag";

type TSearchResult = {
  search: string;
  selectedCategories: TCategory[];
  setSelectedCategories: (category: TCategory) => void;
};

const CategoriesSelect = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<TCategory[]>([]);

  const customSetSelectedCategories = (category: TCategory) => {
    return isInSelectedCategories(selectedCategories, category)
      ? setSelectedCategories((prev) =>
          prev.filter((item) => item.id !== category?.id)
        )
      : setSelectedCategories([...selectedCategories, category]);
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          className="w-full justify-between"
        >
          {selectedCategories?.length ? (
            <div className="flex gap-2">
              {selectedCategories.map((item) => (
                <categoriesTag item={item} key={item.id} />
              ))}
            </div>
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
              selectedCategories={selectedCategories}
              setSelectedCategories={customSetSelectedCategories}
            />
          </Command>
        </DialogContent>
      </Dialog>
    </Popover>
  );
};

const SearchResult = ({
  search,
  selectedCategories,
  setSelectedCategories,
}: TSearchResult) => {
  const [res, setRes] = useState<TCategory[]>(categories);
  const [isLoading, setIsLoading] = useState(false);

  return (
    <ScrollArea className="max-h-[250px]" type="always">
      <CommandList className="overflow-hidden">
        {isLoading && (
          <CommandItem className="__className_aaf875">Loading...</CommandItem>
        )}
        {!isLoading &&
          res.length > 0 &&
          res.map((item) => (
            <>
              <CommandItem
                data-current={isInSelectedCategories(selectedCategories, item)}
                onSelect={() => setSelectedCategories(item)}
                className={cn("flex justify-between cursor-pointer p-3", {
                  "bg-primary text-white rounded-none": isInSelectedCategories(
                    selectedCategories,
                    item
                  ),
                })}
              >
                {item.name}
                {isInSelectedCategories(selectedCategories, item) && (
                  <Check size={18} />
                )}
              </CommandItem>
            </>
          ))}
      </CommandList>
    </ScrollArea>
  );
};

export default CategoriesSelect;
