"use client";

import { useState, useEffect, useRef } from "react";
import type { Task, TaskPriority } from "../types/task";

interface EditTaskModalProps {
  task: Task;
  onSave: (id: string, updates: { title: string; description?: string; priority: TaskPriority }) => void;
  onCancel: () => void;
}

export default function EditTaskModal({ task, onSave, onCancel }: EditTaskModalProps) {
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description ?? "");
  const [priority, setPriority] = useState<TaskPriority>(task.priority);
  const [error, setError] = useState("");
  const titleRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    titleRef.current?.focus();
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onCancel();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onCancel]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      setError("> ERROR: TITLE REQUIRED_");
      return;
    }
    onSave(task.id, {
      title: title.trim(),
      description: description.trim() || undefined,
      priority,
    });
  };

  return (
    /* Backdrop */
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70"
      onClick={(e) => { if (e.target === e.currentTarget) onCancel(); }}
    >
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md border border-[#00ff41] bg-[#0a0a0a] p-5 flex flex-col gap-3 text-xs shadow-[0_0_24px_#00ff4133]"
      >
        <div className="text-[#00ff41] tracking-wider mb-1">&gt; EDIT TASK:_</div>

        <div className="flex flex-col gap-1">
          <label className="text-[#005c1a] tracking-wider">TITLE</label>
          <input
            ref={titleRef}
            type="text"
            value={title}
            onChange={(e) => { setTitle(e.target.value); setError(""); }}
            className="bg-transparent border border-[#00ff4133] text-[#00ff41] px-2 py-1 outline-none focus:border-[#00ff41] placeholder-[#005c1a] tracking-wide"
            placeholder="> _"
            autoComplete="off"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-[#005c1a] tracking-wider">DESCRIPTION (OPTIONAL)</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
            className="bg-transparent border border-[#00ff4133] text-[#00ff41] px-2 py-1 outline-none focus:border-[#00ff41] placeholder-[#005c1a] tracking-wide resize-none"
            placeholder="> _"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-[#005c1a] tracking-wider">PRIORITY</label>
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value as TaskPriority)}
            className="bg-[#0a0a0a] border border-[#00ff4133] text-[#00ff41] px-2 py-1 outline-none focus:border-[#00ff41] tracking-wide"
          >
            <option value="LOW">[LOW]</option>
            <option value="MED">[MED]</option>
            <option value="HIGH">[HIGH]</option>
          </select>
        </div>

        {error && (
          <div className="text-[#ff4444] tracking-wider">{error}</div>
        )}

        <div className="flex gap-2 mt-1">
          <button
            type="submit"
            className="flex-1 border border-[#00ff41] text-[#00ff41] py-1 tracking-wider hover:bg-[#00ff4133] transition-colors cursor-pointer"
          >
            [SAVE]
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 border border-[#00ff4133] text-[#005c1a] py-1 tracking-wider hover:text-[#00ff41] hover:border-[#00ff41] transition-colors cursor-pointer"
          >
            [CANCEL]
          </button>
        </div>
      </form>
    </div>
  );
}
