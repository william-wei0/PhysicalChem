import { useState, useCallback } from "react";
import { LessonTasksContext, type TaskSection } from "./LessonTasksContext";

export function LessonTasksProvider({
  initialTaskSections,
  children,
}: {
  initialTaskSections: TaskSection[];
  children: React.ReactNode;
}) {
  const [sections, setSections] = useState<TaskSection[]>(initialTaskSections);

  const completeTask = useCallback((taskId: string) => {
    setSections((prev) =>
      prev.map((section) => ({
        ...section,
        tasks: section.tasks.map((t) => (t.id === taskId ? { ...t, completed: true } : t)),
      })),
    );
  }, []);

  const resetTasks = useCallback(() => setSections(initialTaskSections), [initialTaskSections]);

  const allComplete = sections.every((section) => section.tasks.every((task) => task.completed));

  return (
    <LessonTasksContext.Provider value={{ sections, completeTask, resetTasks, allComplete }}>
      {children}
    </LessonTasksContext.Provider>
  );
}
