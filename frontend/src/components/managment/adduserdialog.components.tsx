
import React, {useEffect, useState} from "react"
import {Dialog, DialogClose,DialogTrigger, DialogContent, DialogHeader, DialogDescription } from "../ui/dialog"
import { DialogTitle } from "@radix-ui/react-dialog";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useUsersTask } from "../../hooks";
import { toast } from "sonner";

export const AddUserDialog:React.FC<{children: React.ReactNode}> = ({children}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const {setEntry, Entry} = useUsersTask();
    
    const handleAddUser= async () => {
        if (!email || !password) {
            if(!email)
            toast("משתמש שגוי", {
                description: "הכנס שם משתמש תקין"
            });
            else if(!password)
            toast("סיסמא שגויה", {
                description: "הכנס סיסמא תקינה"
            });
            
            return;
        }
    setEntry(prev => [
        ...prev,
        {
            employeeId: String(Entry.length + 1),
            employeeName: email,
            role: "User",
            status: "Active",
            schedule: {},
        }
    ]);
    
    };

    return(
        <Dialog>
            <DialogTrigger>
                {children}
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle >הוספת משתמש</DialogTitle>
                    <DialogDescription>הוסף משתמש חדש למערכת</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <Label htmlFor="Email">Username</Label>
                    <Input
                        id="username"
                        type="username"
                        placeholder="Enter name"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="bg-background text-foreground"
                    />
                    <Label htmlFor="password">Password</Label>
                    <Input
                        id="password"
                        type="password"
                        placeholder="Enter your new password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="bg-background text-foreground"

                    />

                    <DialogClose asChild>
                        <Button className="bg-blue-500 text-white hover:bg-blue-600" type="submit" onClick={handleAddUser}>
                        הוספה
                        </Button>
                    </DialogClose>
                </div>
            </DialogContent>

        </Dialog>
    );

}