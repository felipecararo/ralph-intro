"use client";

import { useState } from "react";
import { useTaskStore } from "../hooks/useTaskStore";
import type { Task, TaskStatus, TaskPriority } from "../types/task";
import TaskCard from "./TaskCard";
import AddTaskForm from "./AddTaskForm";

const COLUMNS: { id: TaskStatus; label: string }[] = [
  { id: "TODO", label: "[ TO_DO ]" },
  { id: "IN_PROGRESS", label: "[ IN_PROGRESS ]" },
  { id: "DONE", label: "[ DONE ]" },
];

export default function KanbanBoard() {
  const { tasksByStatus, createTask, moveTask, deleteTask } = useTaskStore();
  const [addingToColumn, setAddingToColumn] = useState<TaskStatus | null>(null);

  // Placeholder handler — edit modal implemented in US-005
  const handleEdit = (_task: Task) => {};
  const handleDelete = (id: string) => deleteTask(id);

  const handleAddSubmit = (data: { title: string; description?: string; priority: TaskPriority; status: TaskStatus }) => {
    createTask(data);
    setAddingToColumn(null);
  };

  return (
    <div className="flex flex-1 gap-4 p-4 overflow-hidden">
      {COLUMNS.map((col) => {
        const colTasks = tasksByStatus(col.id);
        const isAdding = addingToColumn === col.id;
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
              {colTasks.length === 0 && !isAdding ? (
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

              {isAdding && (
                <AddTaskForm
                  status={col.id}
                  onSubmit={handleAddSubmit}
                  onCancel={() => setAddingToColumn(null)}
                />
              )}
            </div>

            {/* Add task button */}
            <div className="p-3 border-t border-[#00ff4133] shrink-0">
              {!isAdding && (
                <button
                  onClick={() => setAddingToColumn(col.id)}
                  className="w-full text-xs text-[#005c1a] hover:text-[#00ff41] hover:border-[#00ff41] border border-[#00ff4133] py-1.5 tracking-wider transition-colors cursor-pointer"
                >
                  [+ ADD TASK]
                </button>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
