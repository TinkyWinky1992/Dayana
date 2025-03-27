


import { Card, CardDescription, CardHeader, CardTitle } from "../ui/card"
import { useUsersTask } from "../../hooks"
import { Label } from "../ui/label";
export const UsersCard = () => {
 const {Entry} = useUsersTask();
 const currentDay = new Date();

 const getDayString = (date: Date) => {
    return date.toLocaleDateString("en-US", { weekday: "long" });
  };
    return(
        <div className="grid gap-10 py-10 px-10">
            <div className="grid grid-cols-3 gap-10">
            {Entry.map((user) => (
                <Card  key={user.employeeId} className="w-[350px]">
                    <CardHeader>
                        <CardTitle>{user.employeeName}</CardTitle>
                        <CardDescription>Showing {user.employeeName} obective  for today</CardDescription>  
                    </CardHeader>        
                    <form>
                        <div className="grid w-full item-center gap 4">
                            <div className="flex flex-col space-y-10">
                                <Label htmlFor="title">Objectives</Label>
                                {(user.schedule[getDayString(currentDay)] || []).map((task => (
                                    <Label>{task.title}</Label>
                                )))}
                            </div>
                        </div>
                    </form>
                </Card>
            ))}
            </div>

        </div>
    )
}