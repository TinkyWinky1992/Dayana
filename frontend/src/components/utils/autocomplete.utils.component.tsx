import { cn } from "../../lib/utils";
import { Command as CommandPrimitive } from "cmdk";
import { Check } from "lucide-react";
import { useMemo, useState } from "react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from "../ui/command";
import { Input } from "../ui/input";
import { Popover, PopoverAnchor, PopoverContent } from "../ui/popover";
import { Skeleton } from "../ui/skeleton";
type Props<T extends string> = {
  selectedValue: T;
  onSelectedValueChange: (value: T) => void;
  searchValue: string;
  onSearchValueChange: (value: string) => void;
  items: { value: any; label: string }[];
  isLoading?: boolean;
  emptyMessage?: string;
  placeholder?: string;
  onChangefunc?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export function AutoComplete<T extends string>({
  selectedValue,
  onSelectedValueChange,
  searchValue,
  onSearchValueChange,
  items,
  isLoading,
  emptyMessage = "No User found.",
  placeholder = "Filter names...",
  onChangefunc,
  className,
}: Props<T> & { className?: string }) {
  const [open, setOpen] = useState(false);
  const [tempItems, setTempItems] = useState(items);
  const labels = useMemo(
    () =>
      items.reduce((acc, item) => {
        acc[item.value] = item.label;
        return acc;
      }, {} as Record<string, string>),
    [items]
  );

  const reset = () => {
    onSelectedValueChange("" as T);
    onSearchValueChange("");
  };

  const onInputBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    if (
      !e.relatedTarget?.hasAttribute("cmdk-list") &&
      labels[selectedValue] !== searchValue
    ) {
      reset();
    }
  };


  const func = (e:any) => {
    const inputValue = e.target.value.toLowerCase();
    
    if (inputValue === "") {
  
      onSearchValueChange("");
      setTempItems(items);
    } else {
      
      const filteredItems = items.filter((item) =>
        item.label.toLowerCase().includes(inputValue)
      );
      onSearchValueChange(inputValue);
      setTempItems(filteredItems);
    }

    if(onChangefunc)
      onChangefunc(e)

  

  }
  const onSelectItem = (inputValue: string) => {
    if (inputValue === selectedValue) {
      reset();
    } else {
      onSelectedValueChange(inputValue as T);
      onSearchValueChange(labels[inputValue] ?? "");
    }
    setOpen(false);
  };

  return (
    <div className={cn("relative", className)}>
      <Popover open={open} onOpenChange={setOpen}>
        {// @ts-ignore
        <Command shouldFilter={false}>
          <PopoverAnchor asChild>
            {// @ts-ignore
            <CommandPrimitive.Input
              asChild
              value={searchValue}
              onValueChange={onSearchValueChange}
              onKeyDown={(e) => setOpen(e.key !== "Escape")}
              onMouseDown={() => setOpen((open) => !!searchValue || !open)}
              onFocus={() => setOpen(true)}
              onBlur={onInputBlur}
            >
              {// @ts-ignore
              <Input className="col-span-3"  placeholder={placeholder} onChange={func}></Input>}
            </CommandPrimitive.Input>}
          </PopoverAnchor>
          {!open && (
            // @ts-ignore
            <CommandList aria-hidden="true" className="hidden" />
          )}
          {// @ts-ignore
          <PopoverContent
            asChild
            onOpenAutoFocus={(e) => e.preventDefault()}
            onInteractOutside={(e) => {
              if (
                e.target instanceof Element &&
                e.target.hasAttribute("cmdk-input")
              ) {
                e.preventDefault();
              }
            }}
            className="w-[--radix-popover-trigger-width] p-0"
          >
            {// @ts-ignore
            <CommandList>
              {isLoading && (
                // @ts-ignore
                <CommandPrimitive.Loading>
                  <div className="p-1">
                    <Skeleton className="h-6 w-full" />
                  </div>
                </CommandPrimitive.Loading>
              )}
              {tempItems.length > 0 && !isLoading ? (
                // @ts-ignore
                <CommandGroup>
                  {tempItems.map((option) => (
                    // @ts-ignore
                    <CommandItem
                      key={option.value}
                      value={option.value}
                      onMouseDown={(e: any) => e.preventDefault()}
                      onSelect={onSelectItem}
                    >
                      {// @ts-ignore
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          selectedValue === option.value
                            ? "opacity-100"
                            : "opacity-0"
                        )}
                      />}
                      {option.label}
                    </CommandItem>
                  ))}
                </CommandGroup>
              ) : null}
              {!isLoading ? (
                // @ts-ignore
                <CommandEmpty>{emptyMessage ?? "No items."}</CommandEmpty>
              ) : null}
            </CommandList>}
          </PopoverContent>}
        </Command>}
      </Popover>
    </div>
  );
}