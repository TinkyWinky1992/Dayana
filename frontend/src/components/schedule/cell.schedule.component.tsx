import { useDraggable, useDroppable, DragEndEvent, DndContext} from '@dnd-kit/core';

import { Task, ScheduleEntry} from '../../entities';
export const DraggableeCell = ({ task, employeeId, day }: { task: Task; employeeId: string; day: string }) => {
  const { attributes, listeners, setNodeRef, isDragging, transform } = useDraggable({
    id: task.id,
    data: {
      task,
      employeeId,
      day,
    },
  });
  const style = transform ? {
    transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
    cursor: 'grab',
    opacity: isDragging ? 0.5 : 1,
  } : undefined;
  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={style}
      className="p-2 bg-secondary rounded shadow-sm flex justify-between items-center"
    >
      <span className="text-sm">{task.title}</span>
    </div>
  );
};



export const DroppableCell = ({ employeeId, day, children }: { employeeId: string; day: string; children?: React.ReactNode }) => {
  const { setNodeRef } = useDroppable({
    id: `${employeeId}-${day}`,
    data: { employeeId, day },
  });

  return (
    <div
      ref={setNodeRef}
      className={`min-w-[120px] space-y-2 p-2 `} 
    >
      {children}
    </div>
  );
};

export const handleDragEnd = (
  event: DragEndEvent,
  setEntry: React.Dispatch<React.SetStateAction<ScheduleEntry[]>>
) => {
  const { active, over } = event;
  if (!over) return;

  const { task, employeeId: sourceEmployeeId, day: sourceDay } = active.data.current as {
    task: { id: string; title: string };
    employeeId: string;
    day: string;
  };

  const { employeeId: targetEmployeeId, day: targetDay } = over.data.current || {};

  const removeTask = () => {
    setEntry((prev) =>
      prev.map((entry) => {
        if (entry.employeeId === sourceEmployeeId) {
          return {
            ...entry,
            schedule: {
              ...entry.schedule,
              [sourceDay]: entry.schedule[sourceDay].filter((currentTask) => currentTask.id !== task.id),
            },
          };
        }
        return entry;
      })
    );
  };

  const addTask = () => {
    setEntry((prev) =>
      prev.map((entry) => {
        if (entry.employeeId === targetEmployeeId) {
          return {
            ...entry,
            schedule: {
              ...entry.schedule,
              [targetDay]: [...(entry.schedule[targetDay] || []), task],
            },
          };
        }
        return entry;
      })
    );
  };

  if (!targetEmployeeId || !targetDay) return;

  // Prevent moving to the same cell
  if (sourceEmployeeId === targetEmployeeId && sourceDay === targetDay) return;

  removeTask();
  addTask();
};

export const DndProvider = ({
  children,
  setEntry,
}: {
  children: React.ReactNode;
  setEntry: React.Dispatch<React.SetStateAction<ScheduleEntry[]>>;
}) => {
  return (
    <DndContext onDragEnd={(event) => handleDragEnd(event, setEntry)}>
      {children}
    </DndContext>
  );
};