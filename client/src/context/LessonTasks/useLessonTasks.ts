import { useContext } from "react";
import { LessonTasksContext } from "./LessonTasksContext";

export function useLessonTasks() {
  const ctx = useContext(LessonTasksContext);
  if (!ctx) throw new Error("useLessonTasks must be used inside LessonTasksProvider");
  return ctx;
}