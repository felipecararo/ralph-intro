"use client";

import { useState, useEffect } from "react";
import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
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
  const [confirmingDelete, setConfirmingDelete] = useState(false);

  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: task.id,
    data: { task },
  });

  useEffect(() => {
    if (!confirmingDelete) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "y" || e.key === "Y") {
        onDelete(task.id);
      } else if (e.key === "n" || e.key === "N" || e.key === "Escape") {
        setConfirmingDelete(false);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [confirmingDelete, onDelete, task.id]);

  const style = {
    transform: CSS.Translate.toString(transform),
    opacity: isDragging ? 0.5 : 1,
    cursor: isDragging ? "grabbing" : "grab",
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className="bg-[#0f1a0f] border border-[#00ff4133] rounded-sm p-3 text-xs text-[#00ff41]"
    >
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

      {/* Delete confirmation or action buttons */}
      {confirmingDelete ? (
        <div className="flex items-center gap-2 mt-2 flex-wrap">
          <span className="text-[#ff4444]">&gt; CONFIRM DELETE? [Y/N]_</span>
          <button
            onClick={() => onDelete(task.id)}
            className="text-[#ff4444] hover:text-white border border-[#ff4444] px-1.5 py-0.5 transition-colors cursor-pointer"
          >
            [Y]
          </button>
          <button
            onClick={() => setConfirmingDelete(false)}
            className="text-[#005c1a] hover:text-[#00ff41] border border-[#00ff4133] hover:border-[#00ff41] px-1.5 py-0.5 transition-colors cursor-pointer"
          >
            [N]
          </button>
        </div>
      ) : (
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
            onClick={() => setConfirmingDelete(true)}
            className="text-[#005c1a] hover:text-[#ff4444] border border-[#00ff4133] hover:border-[#ff4444] px-1.5 py-0.5 transition-colors cursor-pointer"
          >
            [DEL]
          </button>
        </div>
      )}
    </div>
  );
}
