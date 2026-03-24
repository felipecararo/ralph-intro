"use client";

const COLUMNS = [
  { id: "TODO" as const, label: "[ TO_DO ]" },
  { id: "IN_PROGRESS" as const, label: "[ IN_PROGRESS ]" },
  { id: "DONE" as const, label: "[ DONE ]" },
];

export default function KanbanBoard() {
  return (
    <div className="flex flex-1 gap-4 p-4 overflow-hidden">
      {COLUMNS.map((col) => (
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
            {/* Empty state */}
            <div className="text-[#005c1a] text-xs text-center mt-4">
              &gt; NO TASKS FOUND_
            </div>
          </div>

          {/* Add task button */}
          <div className="p-3 border-t border-[#00ff4133] shrink-0">
            <button className="w-full text-xs text-[#005c1a] hover:text-[#00ff41] hover:border-[#00ff41] border border-[#00ff4133] py-1.5 tracking-wider transition-colors cursor-pointer">
              [+ ADD TASK]
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
