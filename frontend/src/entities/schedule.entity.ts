export  type Task = {
    id: string;
    title: string;
  }
export type ScheduleEntry = {
    employeeId: string;
    employeeName: string;
    role: string,
    status: string
    schedule: {
      [key: string]: Task[];
    };
  }