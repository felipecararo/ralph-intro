"use client";

import { useTaskStore } from "../hooks/useTaskStore";
import type { Task, TaskStatus } from "../types/task";
import TaskCard from "./TaskCard";

const COLUMNS: { id: TaskStatus; label: string }[] = [
  { id: "TODO", label: "[ TO_DO ]" },
  { id: "IN_PROGRESS", label: "[ IN_PROGRESS ]" },
  { id: "DONE", label: "[ DONE ]" },
];

export default function KanbanBoard() {
  const { tasksByStatus, moveTask, deleteTask } = useTaskStore();

  // Placeholder handlers — edit/delete modals implemented in later stories
  const handleEdit = (_task: Task) => {};
  const handleDelete = (id: string) => deleteTask(id);

  return (
    <div className="flex flex-1 gap-4 p-4 overflow-hidden">
      {COLUMNS.map((col) => {
        const colTasks = tasksByStatus(col.id);
        return (
          <div
            key={col.id}
            className="flex flex-col flex-1 min-w-0 bg-[#111811] border border-[#00ff4133] rounded-sm overflow-hidden"
          >
            {/* Column header */}
            <div className="px-4 py-3 border-b border-[#00ff4133] shrink-0">
              <h2 className="text-[#00ff41] text-sm font-bold tracking-widest uppercase">
                {col.label}
              </h2>
            </div>

            {/* Column body */}
            <div className="flex-1 overflow-y-auto p-3 flex flex-col gap-2">
              {colTasks.length === 0 ? (
                <div className="text-[#005c1a] text-xs text-center mt-4">
                  &gt; NO TASKS FOUND_
                </div>
              ) : (
                colTasks.map((task) => (
                  <TaskCard
                    key={task.id}
                    task={task}
                    onMove={moveTask}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                  />
                ))
              )}
            </div>

            {/* Add task button */}
            <div className="p-3 border-t border-[#00ff4133] shrink-0">
              <button className="w-full text-xs text-[#005c1a] hover:text-[#00ff41] hover:border-[#00ff41] border border-[#00ff4133] py-1.5 tracking-wider transition-colors cursor-pointer">
                [+ ADD TASK]
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
