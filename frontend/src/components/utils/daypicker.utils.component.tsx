
import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "../../lib/utils";
import { Button } from "../ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../ui/popover";

const DAYS_OF_WEEK = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
type DayPickerProps = {
  value: string; // The currently selected day
  setValue: (value: string) => void; // Function to update the selected day
};

export const DayPicker:React.FC<DayPickerProps> = ({value, setValue}) => {
  const [open, setOpen] = React.useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {value ? value : "Select a day..."}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search day..." className="h-9" />
          <CommandList>
            <CommandEmpty>No matching days found</CommandEmpty>
            <CommandGroup>
              {DAYS_OF_WEEK.map((day) => (
                <CommandItem
                  key={day}
                  value={day}
                  onSelect={(currentValue: any) => {
                    setValue(currentValue === value ? "" : currentValue);
                    setOpen(false);
                  }}
                >
                  {day}
                  <Check
                    className={cn(
                      "ml-auto",
                      value === day ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};