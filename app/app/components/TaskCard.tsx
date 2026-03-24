"use client";

import type { Task, TaskStatus } from "../types/task";

const PRIORITY_COLORS: Record<Task["priority"], string> = {
  HIGH: "#ff4444",
  MED: "#ffcc00",
  LOW: "#00aa33",
};

const STATUS_ORDER: TaskStatus[] = ["TODO", "IN_PROGRESS", "DONE"];

interface TaskCardProps {
  task: Task;
  onMove: (id: string, status: TaskStatus) => void;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
}

export default function TaskCard({ task, onMove, onEdit, onDelete }: TaskCardProps) {
  const currentIdx = STATUS_ORDER.indexOf(task.status);
  const canMoveLeft = currentIdx > 0;
  const canMoveRight = currentIdx < STATUS_ORDER.length - 1;

  return (
    <div className="bg-[#0f1a0f] border border-[#00ff4133] rounded-sm p-3 text-xs text-[#00ff41]">
      {/* Priority badge + title row */}
      <div className="flex items-start gap-2 mb-1">
        <span
          className="shrink-0 font-bold"
          style={{ color: PRIORITY_COLORS[task.priority] }}
        >
          [{task.priority}]
        </span>
        <span className="font-bold truncate">{task.title}</span>
      </div>

      {/* Description */}
      {task.description && (
        <div className="text-[#005c1a] mb-2 truncate">{task.description}</div>
      )}

      {/* Action buttons */}
      <div className="flex gap-1 mt-2 flex-wrap">
        {canMoveLeft && (
          <button
            onClick={() => onMove(task.id, STATUS_ORDER[currentIdx - 1])}
            className="text-[#005c1a] hover:text-[#00ff41] border border-[#00ff4133] hover:border-[#00ff41] px-1.5 py-0.5 transition-colors cursor-pointer"
          >
            [&lt;&lt;]
          </button>
        )}
        {canMoveRight && (
          <button
            onClick={() => onMove(task.id, STATUS_ORDER[currentIdx + 1])}
            className="text-[#005c1a] hover:text-[#00ff41] border border-[#00ff4133] hover:border-[#00ff41] px-1.5 py-0.5 transition-colors cursor-pointer"
          >
            [&gt;&gt;]
          </button>
        )}
        <button
          onClick={() => onEdit(task)}
          className="text-[#005c1a] hover:text-[#00ff41] border border-[#00ff4133] hover:border-[#00ff41] px-1.5 py-0.5 transition-colors cursor-pointer"
        >
          [EDIT]
        </button>
        <button
          onClick={() => onDelete(task.id)}
          className="text-[#005c1a] hover:text-[#ff4444] border border-[#00ff4133] hover:border-[#ff4444] px-1.5 py-0.5 transition-colors cursor-pointer"
        >
          [DEL]
        </button>
      </div>
    </div>
  );
}
