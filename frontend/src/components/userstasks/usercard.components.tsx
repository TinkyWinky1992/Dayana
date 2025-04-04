import { Card, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { useUsersTask } from "../../hooks";
import { Label } from "../ui/label";
export const UsersCard = () => {
  const { Entry } = useUsersTask();
  const currentDay = new Date();

  const getDayString = (date: Date) => {
    return date.toLocaleDateString("en-US", { weekday: "long" });
  };

  console.log();
  return (
    <div className="grid gap-10 py-10 px-10">
      <div className="grid grid-cols-3 gap-10">
        {Entry.map((user) => (
          <Card
            key={user.employeeId}
            className="w-[350px] hover:cursor-pointer hover:opacity-50 transition-all duration-200 active:scale-95 active:bg-gray-800"
            onClick={() => console.log("hi")}
          >
            <CardHeader>
              <CardTitle>{user.employeeName}</CardTitle>
              <CardDescription>
                Showing {user.employeeName} obective for today
              </CardDescription>
            </CardHeader>
            <form>
              <div className="grid w-full item-center gap 4 ">
                <div className="flex flex-col space-y-5 px-5 py-5">
                  <Label htmlFor="title">Objectives</Label>
                  {(user.schedule[getDayString(currentDay)] || []).length >
                  0 ? (
                    (user.schedule[getDayString(currentDay)] || []).map(
                      (task) => <CardDescription>{task.title}</CardDescription>
                    )
                  ) : (
                    <CardDescription>No tasks for today</CardDescription>
                  )}
                </div>
              </div>
            </form>
          </Card>
        ))}
      </div>
    </div>
  );
};
/*
                  {(user.schedule[getDayString(currentDay)] || []).map(
                    (task) => (
                      <CardDescription>{task.title}</CardDescription>
                    )
                  )}
                    */
