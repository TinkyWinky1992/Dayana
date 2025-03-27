import React, {
    createContext,
    useState,
    useContext,
    ReactNode,
    SetStateAction,
    Dispatch,
  } from "react";
  
 import { ScheduleEntry } from "../entities";



  type DateContext = {
    Entry: ScheduleEntry[];
    setEntry: Dispatch<SetStateAction<ScheduleEntry[]>>
  };

  const mockData: ScheduleEntry[] = [
    {
      employeeId: '1',
      employeeName: 'Daniel',
      role: 'user',
      status: 'Active',
      schedule: {
        Sunday: [{ id: '2', title: 'בדיקה 11', }],
        Monday: [
          { id: '11', title: 'בדיקה 1',  },
          { id: '10', title: "בדיקה 2"},
        ],
      },
    },
    
    {
      employeeId: '2',
      employeeName: 'Yuval',
      role: 'admin',
      status: 'Active',
      schedule: {
        Sunday: [{ id: '3', title: 'בדיקה 5',}],
        Monday: [
          { id: '6', title: 'בדיקה 3',  },
          { id: '8', title: 'בדיקה 4', },
        ],
      },
    },
    {
      employeeId: '3',
      employeeName: 'Ofer',
      role: 'user',
      status: 'Active',
      schedule: {
        Sunday: [{ id: '4', title: 'בדיקה', }],
        Monday: [
          { id: '7', title: 'בדיקה 6', },
          { id: '9', title: 'בדיקה 7', },
        ],
      },
    },
    {
      employeeId: '4',
      employeeName: 'Bahaa',
      role: 'user',
      status: 'Active',
      schedule: {
        Sunday: [{ id: '5', title: 'בדיקה 8', }],
        Monday: [
          { id: '12', title: 'בדיקה 9', },
          { id: '13', title: 'בדיקה 10', },
        ],
      },
    },
    {
      employeeId: '5',
      employeeName: 'sagi',
      role: 'user',
      status: 'Active',
      schedule: {
        Sunday: [{ id: '14', title: 'בדיקה בדיקה', }],
        Monday: [
          { id: '15', title: 'אבטש', },
          { id: '16', title: 'אבטש', },
        ],
      },
    },
    

  ];


  
  const DetailsContext = createContext<DateContext | undefined>(undefined);
  
  export const UsersTaskProvider: React.FC<{ children: ReactNode, }> = ({
    children,
  }) => {
    const [Entry, setEntry] = useState<ScheduleEntry[]>(mockData);

    return (
      <DetailsContext.Provider
        value={{
          Entry,
          setEntry,
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