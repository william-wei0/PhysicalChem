import { useState, useCallback, useEffect, useMemo } from "react";
import { useAuth } from "../auth/useAuth";
import { Notification } from "@/components/Notification";
import { useUnitManifest } from "@/hooks/useUnitManifest";
import { renderLabel } from "@/context/LessonTasks/LessonLabel";
import { LessonTasksContext, type TaskSection } from "./LessonTasksContext";
import { fetchUnitProgress } from "@/utils/fetchLessonProgress";

export function LessonTasksProvider({
  chapterId,
  unitId,
  children,
}: {
  chapterId: number;
  unitId: number;
  children: React.ReactNode;
}) {
  const { manifest, loading: manifestLoading } = useUnitManifest(chapterId, unitId);
  const [completedIds, setCompletedIds] = useState<Set<string>>(new Set());
  const [showErrorNotif, setShowErrorNotif] = useState(false);
  const { isAuthenticated } = useAuth();
  const apiBase = `/api/lessonProgress/chapters/${chapterId}/units/${unitId}`;

  useEffect(() => {
    if (!isAuthenticated || !manifest) return;
    fetchUnitProgress(chapterId, unitId).then((ids) => {
      setCompletedIds(new Set(ids));
    });
  }, [isAuthenticated, manifest, chapterId, unitId]);

  const sections = useMemo<TaskSection[]>(() => {
    if (!manifest || !manifest.sections || manifest.error ) return [];
    return manifest.sections.map((section) => ({
      id: section.id,
      title: section.title,
      tasks: section.tasks.map((t) => ({
        id: t.taskId,
        label: renderLabel(t.label),
        completed: completedIds.has(t.taskId),
      })),
    }));
  }, [manifest, completedIds]);

  const completeTask = useCallback(
    async (taskId: string) => {
      setCompletedIds((prev) => new Set(prev).add(taskId));

      if (!isAuthenticated) return;

      const res = await fetch(`${apiBase}/tasks/${taskId}/complete`, {
        method: "POST",
        credentials: "include",
      });

      if (!res.ok) {
        setCompletedIds((prev) => {
          const next = new Set(prev);
          next.delete(taskId);
          return next;
        });
        setShowErrorNotif(true);
      }
    },
    [apiBase, isAuthenticated],
  );

  const hasBeenCompleted = useCallback(
    (taskId: string) => {
      const exists = manifest?.sections.some((s) => s.tasks.some((t) => t.taskId === taskId));
      if (!exists) {
        if (import.meta.env.VITE_DEVELOPMENT_MODE === "development") {
          console.warn(`hasBeenCompleted: task "${taskId}" not found in any section`);
        }
        return false;
      }
      return completedIds.has(taskId);
    },
    [manifest, completedIds],
  );

  const resetTasks = useCallback(async () => {
    if (!isAuthenticated || !manifest) return;
    setCompletedIds(new Set());
    await fetch(`${apiBase}/progress`, { method: "DELETE", credentials: "include" });
  }, [isAuthenticated, manifest, apiBase]);

  const allComplete = useMemo(
    () => sections.length > 0 && sections.every((s) => s.tasks.every((t) => t.completed)),
    [sections],
  );

  if (manifestLoading) return <div>Loading...</div>;

  return (
    <LessonTasksContext.Provider
      value={{ chapterId, unitId, sections, completeTask, hasBeenCompleted, resetTasks, allComplete }}
    >
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
