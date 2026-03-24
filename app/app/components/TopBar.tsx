"use client";

export default function TopBar() {
  return (
    <header className="flex items-center justify-between px-6 py-3 border-b border-[#00ff4133] bg-[#0a0a0a] shrink-0">
      <div className="flex items-center gap-3">
        <span className="text-[#00ff41] text-lg font-bold tracking-widest">
          [ TASK_OS v1.0 ]
        </span>
        <span className="cursor-blink text-[#00ff41] font-bold">_</span>
      </div>
      <div className="text-[#005c1a] text-xs tracking-wider">
        [N] NEW &nbsp; [ESC] CANCEL &nbsp; [DEL] DELETE
      </div>
    </header>
  );
}
