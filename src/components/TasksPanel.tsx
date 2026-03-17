import { useLessonTasks } from "@/context/LessonTasks/useLessonTasks";
import type { TaskSection } from "@/context/LessonTasks/LessonTasksContext";
import "./styles/taskPanel.css";

function TaskSectionGroup({ section }: { section: TaskSection }) {
  const sectionComplete = section.tasks.every((t) => t.completed);
  const completedCount = section.tasks.filter((t) => t.completed).length;
  const progress = (completedCount / section.tasks.length) * 100;

  return (
    <div
      className={`taskSection transition-all duration-500 ease-in-out
        ${sectionComplete ? "opacity-60 bg-green-500/20" : "opacity-100 bg-slate-50/30 "}
      `}
    >
      <div className="w-full">
        <div className="flex items-start justify-between">
          <div>{section.title && <h4 className="taskSectionTitle">{section.title}</h4>}</div>
          <span className="text-sm font-medium mt-3">{progress.toFixed(1)}%</span>
        </div>
        <div className="w-full h-1.5 bg-slate-300 rounded-full overflow-hidden mb-3">
          <div className="h-full bg-black transition-all duration-1500 ease-out" style={{ width: `${progress}%` }} />
        </div>
      </div>

      <ul className="space-y-2 mt-2">
        {section.tasks.map((task) => (
          <li
            key={task.id}
            className={`
              flex items-center gap-2 px-2 rounded-lg
              transition-all duration-150 ease-in-out
              ${task.completed ? "opacity-50 line-through translate-x-1" : "opacity-100 hover:bg-slate-300"}
            `}
          >
            <span className="w-5 h-5 flex items-center justify-center">
              {task.completed ? (
                <svg className="w-5 h-5 text-green-900" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" className="opacity-30" />

                  <path
                    d="M7 13l3 3 7-7"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="checkmark-path"
                  />
                </svg>
              ) : (
                <div className="w-4 h-4 rounded-full border-2 border-gray-400 opacity-50" />
              )}
            </span>

            <span>{task.label}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function TasksPanel() {
  const { sections } = useLessonTasks();
  const totalTasks = sections.flatMap((s) => s.tasks).length;
  const completedTasks = sections.flatMap((s) => s.tasks).filter((t) => t.completed).length;

  const overallProgress = (completedTasks / totalTasks) * 100;

  return (
    <div className="tasksPanelBackground ">
      <div className="tasksPanel animate-fadeInLessonTasks">
        <h3 className="text-2xl font-bold">Simulation Objectives</h3>
        <div className="w-full space-y-2">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium">
                Objectives Completed ({completedTasks}/{totalTasks})
              </p>
            </div>
            <div>
              <p className="text-sm font-medium">{overallProgress.toFixed(1)}%</p>
            </div>
          </div>
          <div className="w-full h-2 bg-slate-300 rounded-full overflow-hidden mb-4">
            <div
              className="h-full bg-black transition-all duration-700 ease-out"
              style={{ width: `${overallProgress}%` }}
            />
          </div>
        </div>
        <div className="space-y-4">
          {sections.map((section) => (
            <TaskSectionGroup key={section.id} section={section} />
          ))}
        </div>
      </div>
    </div>
  );
}
