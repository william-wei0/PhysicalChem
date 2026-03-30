import { createContext } from "react";

export type Task = {
  id: string;
  label: React.ReactNode;
  completed: boolean;
};

export type TaskSection = {
  id: string;
  title?: string;
  tasks: Task[];
};

type LessonTasksContext = {
  chapterId: number;
  unitId: number;
  sections: TaskSection[];
  completeTask: (taskId: string) => void;
  hasBeenCompleted: (taskId: string) => boolean;
  resetTasks: () => void;
  allComplete: boolean;
};

export const LessonTasksContext = createContext<LessonTasksContext | null>(null);
