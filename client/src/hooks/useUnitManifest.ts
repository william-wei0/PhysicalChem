import { useEffect, useState } from "react";
import type { UnitManifest } from "@/context/LessonTasks/LessonTasksContext";

export function useUnitManifest(chapterId: number, unitId: number) {
  const [manifest, setManifest] = useState<UnitManifest | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/lessonProgress/chapters/${chapterId}/units/${unitId}/manifest`)
      .then((r) => r.json())
      .then((data: UnitManifest) => { setManifest(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, [chapterId, unitId]);

  return { manifest, loading };
}