import { useState, useEffect } from 'react';
import { useAuth } from '../../contexts';
import { useNavigate } from 'react-router-dom';
import { TaskDialog } from '.';
import { Button } from "../ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import {  useUsersTask } from '../../hooks';
import { DraggableeCell, DroppableCell, DndProvider } from './cell.schedule.component';
const DAYS_OF_WEEK = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];


export const Schedule = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [page, setPage] = useState(0);
  const [pageSize] = useState(3);
  const { Entry, setEntry } = useUsersTask();

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
  }, [user, navigate]);


  if (!user) return null;

  return (
    <div className="flex-1 px-4 py-2">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 space-y-2 sm:space-y-0">
        <h1 className="text-lg sm:text-xl font-bold">לוח משימות צוות</h1>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-muted-foreground">
            Welcome, {user.name} ({user.role})
          </span>
        </div>
      </div>

      <Card className="w-full shadow-none rounded-lg border-0 bg-background">
        <CardHeader className="pb-2 px-0">
          <CardTitle className="text-lg sm:text-2xl">לוח שבועי</CardTitle>
        </CardHeader>
        <CardContent className="p-0 overflow-x-auto">
            <DndProvider setEntry={setEntry}>
              <Table className="min-w-[600px] sm:min-w-full">
                <TableHeader>
                  <TableRow className="border-b border-border hover:bg-transparent">
                    <TableHead className="text-sm font-bold">Employee</TableHead>
                    {DAYS_OF_WEEK.map((day) => (
                      <TableHead key={day} className="text-sm font-bold">{day}</TableHead>
                    ))}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {Entry.slice(page * 3, page * 3 + 3).map((entry) => ( // Paginate rows, 3 per page
                    <TableRow key={entry.employeeId} className="border-b border-border hover:bg-transparent">
                      <TableCell className="text-sm font-medium">{entry.employeeName}</TableCell>
                      {DAYS_OF_WEEK.map((day) => (
                        <TableCell key={`${entry.employeeId}-${day}`} className="min-w-[120px]">
                          <DroppableCell employeeId={entry.employeeId} day={day}>
                            {(entry.schedule[day] || []).map((task) => (
                              <DraggableeCell
                                key={task.id}
                                task={task}
                                employeeId={entry.employeeId}
                                day={day}
                              />
                            ))}
                          </DroppableCell>
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </DndProvider>
        </CardContent>
      </Card>

      <div className="flex flex-col sm:flex-row justify-between items-center mt-4 space-y-2 sm:space-y-0">
        <div className="text-sm text-muted-foreground">
          Page {page + 1} of {Math.ceil(Entry.length / pageSize)}
        </div>
        <div className="flex space-x-2">

          <TaskDialog />

          <Button
            onClick={() => setPage((prev) => Math.max(prev - 1, 0))}
            disabled={page === 0}
            variant="outline"
            className="text-sm"
          >
            Previous
          </Button>
          <Button
            onClick={() => setPage((prev) => Math.min(prev + 1, Math.floor(Entry.length / pageSize)))}
            disabled={(page + 1) * pageSize >= Entry.length}
            variant="outline"
            className="text-sm"
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}