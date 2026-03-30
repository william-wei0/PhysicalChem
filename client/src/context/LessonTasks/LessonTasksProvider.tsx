import { useState, useCallback, useEffect } from "react";
import { LessonTasksContext, type TaskSection } from "./LessonTasksContext";
import { useAuth } from "../auth/useAuth";
import { Notification } from "@/components/Notification";

export function LessonTasksProvider({
  initialTaskSections,
  chapterId,
  unitId,
  children,
}: {
  initialTaskSections: TaskSection[];
  chapterId: number;
  unitId: number;
  children: React.ReactNode;
}) {
  const [sections, setSections] = useState<TaskSection[]>(initialTaskSections);
  const [showErrorNotif, setShowErrorNotif] = useState(false);
  const { isAuthenticated } = useAuth();
  const LessonProgressAPIRoute = `/api/lessonProgress/chapters/${chapterId}/units/${unitId}`;

  useEffect(() => {
    if (!isAuthenticated) return;

    const fetchProgress = async () => {
      const res = await fetch(`${LessonProgressAPIRoute}/progress`, { credentials: "include" });
      if (!res.ok) return;

      const { progress } = await res.json();
      const completedIds = new Set(progress.map((p: { taskId: string }) => p.taskId));

      setSections((prev) =>
        prev.map((section) => ({
          ...section,
          tasks: section.tasks.map((t) => ({ ...t, completed: completedIds.has(t.id) })),
        })),
      );
    };

    fetchProgress();
  }, [LessonProgressAPIRoute, isAuthenticated]);

  const completeTask = useCallback(
    async (taskId: string) => {
      setSections((prev) =>
        prev.map((section) => ({
          ...section,
          tasks: section.tasks.map((t) => (t.id === taskId ? { ...t, completed: true } : t)),
        })),
      );

      if (!isAuthenticated) {
        return;
      }
      const res = await fetch(`${LessonProgressAPIRoute}/tasks/${taskId}/complete`, {
        method: "POST",
        credentials: "include",
      });

      if (!res.ok) {
        setSections((prev) =>
          prev.map((section) => ({
            ...section,
            tasks: section.tasks.map((t) => (t.id === taskId ? { ...t, completed: false } : t)),
          })),
        );
        setShowErrorNotif(true);
      }
    },
    [LessonProgressAPIRoute, isAuthenticated],
  );

  const hasBeenCompleted = useCallback(
    (taskId: string) => {
      const exists = sections.some((section) => section.tasks.some((task) => task.id === taskId));

      if (!exists) {
        if (import.meta.env.VITE_DEVELOPMENT_MODE === "development") {
          console.warn(`hasBeenCompleted: task "${taskId}" not found in any section`);
        }
        return false;
      }

      return sections.some((section) => section.tasks.some((task) => task.id === taskId && task.completed));
    },
    [sections],
  );

  const resetTasks = useCallback(async () => {
    if (!isAuthenticated) return;
    setSections(initialTaskSections);

    await fetch(`${LessonProgressAPIRoute}/progress`, {
      method: "DELETE",
      credentials: "include",
    });
  }, [LessonProgressAPIRoute, initialTaskSections, isAuthenticated]);

  const allComplete = sections.every((section) => section.tasks.every((task) => task.completed));

  return (
    <LessonTasksContext.Provider value={{ chapterId, unitId, sections, completeTask, hasBeenCompleted, resetTasks, allComplete }}>
      {showErrorNotif && (
        <Notification
          message="Something went wrong."
          description="Your task progress may not have been saved."
          type="warning"
          timeout={4000}
          theme="light"
          onClose={() => setShowErrorNotif(false)}
        />
      )}

      {children}
    </LessonTasksContext.Provider>
  );
}
