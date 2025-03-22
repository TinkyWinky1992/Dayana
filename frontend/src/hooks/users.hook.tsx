import React, {
    createContext,
    useState,
    useContext,
    ReactNode,
    SetStateAction,
    Dispatch,
  } from "react";
  
  type Task = {
    id: string;
    title: string;
    status: string; // e.g., "Pending", "In Progress", "Completed"
  }
  
  type ScheduleEntry = {
    employeeId: string;
    employeeName: string;
    schedule: {
      [key: string]: Task[];
    };
  }
  type User = {
    name: string
    role: string
    status: string
}

  type DateContext = {
    Entry: ScheduleEntry[];
    setEntry: Dispatch<SetStateAction<ScheduleEntry[]>>
    userData: User[]
    setUser: Dispatch<SetStateAction<User[]>>
  };

  const mockData: ScheduleEntry[] = [
    {
      employeeId: '1',
      employeeName: 'Daniel',
      schedule: {
        Sunday: [{ id: '1', title: 'Prepare Report', status: 'Pending' }],
        Monday: [
          { id: '2', title: 'Team Meeting', status: 'In Progress' },
          { id: '3', title: 'Code Review', status: 'Completed' },
        ],
      },
    },
    {
      employeeId: '1',
      employeeName: 'Yuval',
      schedule: {
        Sunday: [{ id: '1', title: 'Prepare Report', status: 'Pending' }],
        Monday: [
          { id: '2', title: 'Team Meeting', status: 'In Progress' },
          { id: '3', title: 'Code Review', status: 'Completed' },
        ],
      },
    },
    // ...other employees
  ];


  const data: User[] = [
    {
        name: 'Yuval',
        role: 'Admin',
        status: 'Active'
    },
    {
        name: 'Bahaa',
        role: 'User',
        status: 'Offline'
    },
    {
        name: 'Daniel',
        role: 'user',
        status: 'Active'
    },
    {
        name: 'Ofer',
        role: 'User',
        status: 'Offline'
    },  
    {
        name: 'sagi',
        role: 'User',
        status: 'Offline'
    },  
    {
        name: 'Jane Doe',
        role: 'User',
        status: 'Inactive'
    },    
    {
        name: 'Ofri',
        role: 'Admin',
        status: 'Active'
    },  
    {
        name: 'nevo',
        role: 'User',
        status: 'Active'
    },    
]
  
  const DetailsContext = createContext<DateContext | undefined>(undefined);
  
  export const UsersTaskProvider: React.FC<{ children: ReactNode, }> = ({
    children,
  }) => {
    const [Entry, setEntry] = useState<ScheduleEntry[]>(mockData);
    const [userData, setUser] = useState<User[]>(data);
  
    return (
      <DetailsContext.Provider
        value={{
          Entry,
          setEntry,
          userData,
          setUser
        }}
      >
        {children}
      </DetailsContext.Provider>
    );
  };
  
  export const useUsersTask = () => {
    const context = useContext(DetailsContext);
    if (context === undefined) {
      throw new Error("useUsersTask must be used within a DetailsProvider");
    }
    return context;
  };