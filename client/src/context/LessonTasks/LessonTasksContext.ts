import { createContext } from "react";

export type Task = {
  id: string;
  label: string;
  completed: boolean;
};

export type TaskSection = {
  id: string;
  title?: string;
  tasks: Task[];
};

type LessonTasksContext = {
  sections: TaskSection[];
  completeTask: (taskId: string) => void;
  resetTasks: () => void;
  allComplete: boolean;
};

export const LessonTasksContext = createContext<LessonTasksContext | null>(null);
