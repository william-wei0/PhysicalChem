import { useState } from "react";
import { HashLink } from "react-router-hash-link";
import { useAllLessonProgress } from "@/hooks/useAllLessonProgress";
import { ResetProgressButton } from "@/components/ResetProgressButton";
import type { ChapterSummary } from "@/context/LessonTasks/LessonTasksContext";

function ChapterProgressSections({
  chapters,
  loading,
  getChapterStats,
  refetchProgress,
}: {
  chapters: ChapterSummary[];
  loading: boolean;
  getChapterStats: (chapterId: number) => { completed: number; total: number; percent: number; allComplete: boolean };
  refetchProgress: () => void;
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const lessonURL = "/lessons";

  const resetChapterProgress = async (chapterId: number) => {
    const res = await fetch(`/api/lessonProgress/chapters/${chapterId}/progress`, {
      method: "DELETE",
      credentials: "include",
    });
    if (res.ok) refetchProgress();
  };

  return (
    <section className="pb-5">
      <h2 className="text-lg font-bold tracking-[0.25em] uppercase text-outline mb-6">Chapters & Simulations</h2>

      {loading ? (
        <p className="text-outline-variant">Loading progress…</p>
      ) : (
        <div className="space-y-10">
          {chapters.map((chapter, i) => {
            const isOpen = openIndex === i;
            const { completed, total, percent, allComplete } = getChapterStats(chapter.chapterId);

            return (
              <div key={chapter.chapterId}>
                <div className="group cursor-pointer" onClick={() => setOpenIndex(isOpen ? null : i)}>
                  <div className="flex justify-between items-baseline mb-2">
                    <h3 className="text-2xl font-bold group-hover:text-primary transition-colors underlineAnimationText">
                      {chapter.title}
                    </h3>
                    <div className="flex items-center gap-4">
                      <span className="text-sm font-mono text-outline-variant italic">{chapter.date}</span>
                      <span
                        className={`text-outline-variant transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
                      >
                        ▾
                      </span>
                    </div>
                  </div>

                  <div className="w-full space-y-2">
                    <div className="flex items-start justify-between">
                      <p className="text-sm font-medium">
                        {allComplete ? "All " : ""}Objectives Completed{allComplete ? "!" : ""} ({completed}/{total})
                      </p>
                      <p className="text-sm font-medium">{percent.toFixed(1)}%</p>
                    </div>
                    <div className="w-full h-2 bg-slate-300 rounded-full overflow-hidden mb-4">
                      <div
                        className={`h-full transition-all duration-700 ease-out ${allComplete ? "bg-green-600/90": "bg-red-700"}`}
                        style={{ width: `${percent}%` }}
                      />
                    </div>
                  </div>

                  <p className="text-on-surface-variant leading-relaxed max-w-4xl">{chapter.description}</p>
                </div>

                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? "max-h-96 opacity-100 mt-6" : "max-h-0 opacity-0"}`}
                >
                  <ul className="border-l-2 border-outline-variant/30 pl-2 space-y-1">
                    {chapter.units.map((unit) => (
                      <li key={unit.unitId}>
                        <HashLink
                          to={lessonURL + unit.href}
                          className="group/unit text-sm font-medium text-on-surface-variant hover:text-primary transition-colors flex items-center gap-3 py-2 px-3 rounded-md hover:bg-primary/5"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-outline-variant/50 group-hover/unit:bg-primary transition-all duration-200 inline-block shrink-0" />
                          <span className="relative inline-block after:absolute after:bottom-[-2px] after:left-0 after:h-[3px] after:w-0 after:bg-primary after:transition-all after:duration-300 group-hover/unit:after:w-full">
                            {unit.title}
                          </span>
                          <span className="ml-auto opacity-0 group-hover/unit:opacity-100 transition-opacity text-primary text-xs">
                            →
                          </span>
                        </HashLink>
                      </li>
                    ))}
                  </ul>
                  <div className="flex justify-end mt-2">
                    <ResetProgressButton
                      onConfirm={() => resetChapterProgress(chapter.chapterId)}
                      label="Reset Chapter Progress"
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}

const AccountDashboard = () => {
  const { chapters, loading, getChapterStats, refetchProgress } = useAllLessonProgress();

  const resetAllProgress = async () => {
    const res = await fetch("/api/lessonProgress/progress", {
      method: "DELETE",
      credentials: "include",
    });
    if (res.ok) refetchProgress();
  };

  return (
    <div className="flex min-h-screen bg-zinc-100">
      <main className="flex-1 flex flex-col pb-10">
        <div className="px-15 pt-10 mx-auto w-full">
          <section className="mb-16 flex items-end justify-between">
            <div className="homepageTitleFont text-6xl md:text-7xl font-extrabold tracking-tighter leading-tight text-on-surface">
              <h1>Physical Chemistry I: CM-UY 3113</h1>
              <h1>Your Progress Report:</h1>
            </div>
          </section>

          <ChapterProgressSections
            chapters={chapters}
            loading={loading}
            getChapterStats={getChapterStats}
            refetchProgress={refetchProgress}
          />

          {!loading && (
            <div className="flex justify-end mt-4">
              <ResetProgressButton onConfirm={resetAllProgress} label="Reset All Progress" />
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default AccountDashboard;
