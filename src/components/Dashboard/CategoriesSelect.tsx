import React, { useState } from "react";

import { MousePointer } from "lucide-react";

import { Popover, PopoverTrigger } from "@/components/ui/popover";
import {
  Command,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Button } from "@/components/ui/button";
import { TODO } from "@/types";
import { cn } from "@/lib/utils";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import CategoriesTag from "@/components/CategoriesTag";
import { ClassValue } from "clsx";
import { useDebounce } from "@/hooks/useDebounce";
import { useCategoriesQuery } from "@/lib/react-query/queries";
import { Category } from "@/dto/categories";
import { isInSelectedCategories } from "./forms/projectForm/useProjectForm";

type TCategoriesSelectProps = {
  selectedCategories: Category[];
  onSelect: TODO;
  className?: {
    PopoverTrigger?: ClassValue;
  };
};

type TSearchResult = TCategoriesSelectProps & {
  searchResult: Category[] | undefined;
  isLoading: boolean;
};

const CategoriesSelect = ({
  selectedCategories,
  onSelect,
  className = {},
}: TCategoriesSelectProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const value = useDebounce(search, 500);

  const { data, isLoading, isError } = useCategoriesQuery(
    {
      name: value,
    },
    {
      enabled: Boolean(value),
    }
  );

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          className={cn(
            "w-full justify-between h-auto",
            className?.PopoverTrigger
          )}
        >
          {selectedCategories?.length ? (
            <div className="flex gap-2 flex-wrap">
              {selectedCategories.map((item) => (
                <CategoriesTag
                  item={item}
                  key={item.id}
                  isRemovable
                  onRemove={() => onSelect(item)}
                />
              ))}
            </div>
          ) : (
            <span> Select Category...</span>
          )}

          <MousePointer className="ml-2 h-4 w-4 shrink-0 opacity-50" />
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
              selectedCategories={selectedCategories}
              onSelect={onSelect}
              searchResult={data?.data}
              isLoading={isLoading}
            />
          </Command>
        </DialogContent>
      </Dialog>
    </Popover>
  );
};

const SearchResult = ({
  selectedCategories,
  onSelect,
  searchResult,
  isLoading,
}: TSearchResult) => {
  const filtered = searchResult?.filter(
    (item) => !isInSelectedCategories(selectedCategories, item)
  );
  return (
    <ScrollArea className="max-h-[250px]" type="always">
      <CommandList className="overflow-hidden">
        {isLoading && (
          <CommandItem className="__className_aaf875 flex justify-center">
            Loading...
          </CommandItem>
        )}

        {filtered?.length === 0 && (
          <CommandItem className="__className_aaf875 flex justify-center">
            No result
          </CommandItem>
        )}

        {!isLoading &&
          filtered &&
          filtered.map((item) => (
            <CommandItem
              key={item.id}
              onSelect={() => onSelect(item)}
              className={"flex justify-between cursor-pointer p-3"}
            >
              {item.name}
            </CommandItem>
          ))}
      </CommandList>
    </ScrollArea>
  );
};

export default CategoriesSelect;
