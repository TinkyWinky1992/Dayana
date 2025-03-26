import { useState, useEffect } from "react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useUsersTask } from "../../hooks";
import { AutoComplete } from "../utils/autocomplete.utils.component";
import { DayPicker } from "../utils/daypicker.utils.component";
import { toast } from "sonner";
import { ScheduleEntry } from "../../entities";


export const TaskDialog = () => {
  const { Entry, setEntry } = useUsersTask();
  const [selectedUser, setSelectedUser] = useState(""); 
  const [searchValue, setSearchValue] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [selectedDay, setSelectedDay] = useState("");

  const onValueChange = (value: string) => {
    setSearchValue(value);
  };

  const handleAddTask = () => {
    if (!selectedUser || !selectedDay || !taskDescription) {
      if (!selectedUser) {
        toast("משתמש לא קיים", {
          description: "בחר משתמש חוקי",
        });
      } else if (!selectedDay) {
        toast("יום לא קיים", {
          description: "בחר ביום תקין",
        });
      } else {
        toast("תיאור עבודה לא", {
          description: "רשום תיאור עבודה",
        });
      }
      return;
    }

    const generateUniqueId = () => {
      return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    };

    const task = {
      id: generateUniqueId(),
      title: taskDescription,
    };

    

    setEntry((prev) => {
      console.log("prev state:", prev);
      return prev.map((entry) => {
        console.log("entry employid", entry.employeeId);
        console.log("selectedUser", selectedUser);  
        if (entry.employeeName === selectedUser) {
          console.log("entry matched:", entry);
          return {
            ...entry,
            schedule: {
              ...entry.schedule,
              [selectedDay]: [...(entry.schedule[selectedDay] || []), task],
            },
          };
        }
        return entry;
      });
    });

    setSelectedUser("");
    setSearchValue("");
    setTaskDescription("");
    setSelectedDay("");
    
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">הוספת משימה</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>הוספה משימה</DialogTitle>
          <DialogDescription>
            בחירת עובד ויום להוספת משימה
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right text-xs">
              איש צוות
            </Label>
            <AutoComplete
            
              items={Entry.map((user: ScheduleEntry) => ({
                value: user.employeeName,
                label: user.employeeName,
              }))}
              selectedValue={selectedUser}
              onSelectedValueChange={(value) => setSelectedUser(value)} // Update selected user
              searchValue={searchValue}
              onSearchValueChange={onValueChange}
              className="col-span-3"
            />
            <Label htmlFor="description" className="text-right text-xs">
              תיאור משימה
            </Label>
            <Input
              id="description"
              value={taskDescription}
              onChange={(e) => setTaskDescription(e.target.value)} // Update task description
              className="col-span-3"
            />
            <Label htmlFor="day" className="text-right text-xs">
              בחירת יום
            </Label>
            <DayPicker
              value={selectedDay}
              setValue={setSelectedDay}
               // Update selected day
            />
          </div>
        </div>
        <DialogClose asChild>
          <Button className="bg-blue-500 text-white hover:bg-blue-600" type="submit" onClick={handleAddTask}>
            הוספה
          </Button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
};
