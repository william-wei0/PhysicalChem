import { createContext } from "react";

export type LabelPart =
  | { type: "text"; text: string }
  | { type: "bold"; text: string }
  | { type: "math"; expression: string };

export type TaskManifest = {
  taskId: string;
  label: LabelPart[];
};

export type SectionManifest = {
  id: string;
  title: string;
  tasks: TaskManifest[];
};

export type UnitManifest = {
  chapterId: number;
  unitId: number;
  title: string;
  sections: SectionManifest[];
  error?: string;
};

export type ChapterSummary = {
  chapterId: number;
  title: string;
  description: string;
  date: string;
  units: {
    unitId: number;
    title: string;
    href: string;
    hasLessonTasks: boolean;
  }[];
};

export type Task = {
  id: string;
  label: React.ReactNode;
  completed: boolean;
};

export type TaskSection = {
  id: string;
  title: string;
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
