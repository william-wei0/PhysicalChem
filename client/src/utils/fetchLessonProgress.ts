type RawProgress = { taskId: string; chapterId: number; unitId: number };

export const fetchAllProgress = async (): Promise<RawProgress[]> => {
  const res = await fetch("/api/lessonProgress/progress", { credentials: "include" });
  if (!res.ok) return [];
  const { progress } = await res.json();
  return progress;
};

export const fetchUnitProgress = async (chapterId: number, unitId: number): Promise<string[]> => {
  const res = await fetch(`/api/lessonProgress/chapters/${chapterId}/units/${unitId}/progress`, {
    credentials: "include",
  });
  if (!res.ok) return [];
  const { progress } = await res.json();
  return progress.map((p: { taskId: string }) => p.taskId);
};

export const buildProgressMap = (progress: RawProgress[]): Map<number, Map<number, Set<string>>> => {
  const map = new Map<number, Map<number, Set<string>>>();
  for (const row of progress) {
    if (!map.has(row.chapterId)) map.set(row.chapterId, new Map());
    const chMap = map.get(row.chapterId)!;
    if (!chMap.has(row.unitId)) chMap.set(row.unitId, new Set());
    chMap.get(row.unitId)!.add(row.taskId);
  }
  return map;
};
