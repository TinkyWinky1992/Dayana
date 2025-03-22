import  {useState} from "react"
import { Button } from "../../components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../components/ui/dialog"
import { Input } from "../../components/ui/input"
import { Label } from "../../components/ui/label"
import { useUsersTask } from "../../hooks"
import { AutoComplete } from "../utilsComponents/autocomplete"

export const  TaskDialog = () => {
  const {userData} = useUsersTask();
      const [selectedUser, setSelectedUser] = useState(""); // State to track selected user
      const [searchValue, setSearchValue] = useState("");

      const onValueChange = (value: string) => {
        setSearchValue(value);
    }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Add Task</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Task</DialogTitle>
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
                items={userData.map((user: any) => ({ value: user.name, label: user.name }))}
                  selectedValue={selectedUser}
                  onSelectedValueChange={(value) => setSelectedUser(value)} // Update selected user
                  searchValue={searchValue}
                  onSearchValueChange={onValueChange}
                  className="col-span-3 "/>
             <Label htmlFor="description" className="text-right text-xs">
              תיאור משימה
            </Label>                  
            <Input
              id="name"
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit">Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
