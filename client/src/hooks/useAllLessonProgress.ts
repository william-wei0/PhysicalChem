import { useEffect, useState, useCallback } from "react";
import { useAuth } from "@/context/auth/useAuth";
import type { ChapterSummary, SectionManifest } from "@/context/LessonTasks/LessonTasksContext";
import { fetchAllProgress, buildProgressMap } from "@/utils/fetchLessonProgress";

export function useAllLessonProgress() {
  const { isAuthenticated } = useAuth();
  const [chapters, setChapters] = useState<ChapterSummary[]>([]);
  const [progressMap, setProgressMap] = useState<Map<number, Map<number, Set<string>>>>(new Map());
  const [totalMap, setTotalMap] = useState<Map<number, Map<number, number>>>(new Map());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadManifests = async () => {
      const chaptersRes = await fetch("/api/lessonProgress/chapters");
      const { chapters: ch }: { chapters: ChapterSummary[] } = await chaptersRes.json();
      setChapters(ch);

      const totals = new Map<number, Map<number, number>>();
      await Promise.all(
        ch.flatMap((chapter) => {
          totals.set(chapter.chapterId, new Map());
          return chapter.units
            .filter((unit) => unit.hasLessonTasks)
            .map(async (unit) => {
              try {
                const r = await fetch(
                  `/api/lessonProgress/chapters/${chapter.chapterId}/units/${unit.unitId}/manifest`,
                );
                if (!r.ok) return;
                const manifest = await r.json();
                const count = manifest.sections.flatMap((s: SectionManifest) => s.tasks).length;
                totals.get(chapter.chapterId)!.set(unit.unitId, count);
              } catch {
                //
              }
            });
        }),
      );
      setTotalMap(totals);
      setLoading(false);
    };

    loadManifests();
  }, []);

  const loadProgress = useCallback(async () => {
    if (!isAuthenticated) return new Map();
    const progress = await fetchAllProgress();
    return buildProgressMap(progress);
  }, [isAuthenticated]);

  const refetchProgress = useCallback(() => loadProgress().then(setProgressMap), [loadProgress]);

  useEffect(() => {
    refetchProgress();
  }, [refetchProgress]);

  const getChapterStats = (chapterId: number) => {
    const unitTotals = totalMap.get(chapterId);
    const unitProgress = progressMap.get(chapterId);
    let completed = 0;
    let total = 0;

    unitTotals?.forEach((count, unitId) => {
      total += count;
      completed += unitProgress?.get(unitId)?.size ?? 0;
    });
    const allComplete = completed === total && total > 0;
    const percent = total === 0 ? 0 : (completed / total) * 100;

    return { completed, total, percent, allComplete };
  };

  return { chapters, loading, getChapterStats, refetchProgress };
}
