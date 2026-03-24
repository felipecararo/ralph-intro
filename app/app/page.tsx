import TopBar from "./components/TopBar";
import KanbanBoard from "./components/KanbanBoard";

export default function Home() {
  return (
    <div className="flex flex-col h-full bg-[#0a0a0a]">
      <TopBar />
      <KanbanBoard />
    </div>
  );
}
