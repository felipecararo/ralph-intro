"use client";

import { useState } from "react";
import {
  DndContext,
  DragOverlay,
  useDroppable,
  type DragEndEvent,
  type DragStartEvent,
  type DragOverEvent,
} from "@dnd-kit/core";
import { useTaskStore } from "../hooks/useTaskStore";
import type { Task, TaskStatus, TaskPriority } from "../types/task";
import TaskCard from "./TaskCard";
import AddTaskForm from "./AddTaskForm";
import EditTaskModal from "./EditTaskModal";

const COLUMNS: { id: TaskStatus; label: string }[] = [
  { id: "TODO", label: "[ TO_DO ]" },
  { id: "IN_PROGRESS", label: "[ IN_PROGRESS ]" },
  { id: "DONE", label: "[ DONE ]" },
];

interface DroppableColumnProps {
  col: { id: TaskStatus; label: string };
  tasks: Task[];
  isAdding: boolean;
  isOver: boolean;
  onMove: (id: string, status: TaskStatus) => void;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
  onAddClick: () => void;
  onAddSubmit: (data: { title: string; description?: string; priority: TaskPriority; status: TaskStatus }) => void;
  onAddCancel: () => void;
}

function DroppableColumn({
  col,
  tasks,
  isAdding,
  isOver,
  onMove,
  onEdit,
  onDelete,
  onAddClick,
  onAddSubmit,
  onAddCancel,
}: DroppableColumnProps) {
  const { setNodeRef } = useDroppable({ id: col.id });

  const borderClass = isOver
    ? "border-[#39ff14] bg-[#0f1f0f]"
    : "border-[#00ff4133] bg-[#111811]";

  return (
    <div
      className={`flex flex-col flex-1 min-w-0 ${borderClass} border rounded-sm overflow-hidden transition-colors`}
    >
      {/* Column header */}
      <div className={`px-4 py-3 border-b ${isOver ? "border-[#39ff14]" : "border-[#00ff4133]"} shrink-0 transition-colors`}>
        <h2 className="text-[#00ff41] text-sm font-bold tracking-widest uppercase">
          {col.label}
        </h2>
      </div>

      {/* Column body — droppable area */}
      <div ref={setNodeRef} className="flex-1 overflow-y-auto p-3 flex flex-col gap-2">
        {tasks.length === 0 && !isAdding ? (
          <div className="text-[#005c1a] text-xs text-center mt-4">
            &gt; NO TASKS FOUND_
          </div>
        ) : (
          tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onMove={onMove}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))
        )}

        {isAdding && (
          <AddTaskForm
            status={col.id}
            onSubmit={onAddSubmit}
            onCancel={onAddCancel}
          />
        )}
      </div>

      {/* Add task button */}
      <div className={`p-3 border-t ${isOver ? "border-[#39ff14]" : "border-[#00ff4133]"} shrink-0 transition-colors`}>
        {!isAdding && (
          <button
            onClick={onAddClick}
            className="w-full text-xs text-[#005c1a] hover:text-[#00ff41] hover:border-[#00ff41] border border-[#00ff4133] py-1.5 tracking-wider transition-colors cursor-pointer"
          >
            [+ ADD TASK]
          </button>
        )}
      </div>
    </div>
  );
}

export default function KanbanBoard() {
  const { tasksByStatus, createTask, updateTask, moveTask, deleteTask } = useTaskStore();
  const [addingToColumn, setAddingToColumn] = useState<TaskStatus | null>(null);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [activeTask, setActiveTask] = useState<Task | null>(null);
  const [overColumnId, setOverColumnId] = useState<TaskStatus | null>(null);

  const handleEdit = (task: Task) => setEditingTask(task);
  const handleEditSave = (id: string, updates: { title: string; description?: string; priority: TaskPriority }) => {
    updateTask(id, updates);
    setEditingTask(null);
  };
  const handleDelete = (id: string) => deleteTask(id);

  const handleAddSubmit = (data: { title: string; description?: string; priority: TaskPriority; status: TaskStatus }) => {
    createTask(data);
    setAddingToColumn(null);
  };

  const handleDragStart = (event: DragStartEvent) => {
    const task = event.active.data.current?.task as Task | undefined;
    if (task) setActiveTask(task);
  };

  const handleDragOver = (event: DragOverEvent) => {
    const colId = event.over?.id as TaskStatus | null;
    setOverColumnId(colId ?? null);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveTask(null);
    setOverColumnId(null);
    if (!over) return;
    const task = active.data.current?.task as Task | undefined;
    const targetStatus = over.id as TaskStatus;
    if (task && task.status !== targetStatus) {
      moveTask(task.id, targetStatus);
    }
  };

  return (
    <>
      {editingTask && (
        <EditTaskModal
          task={editingTask}
          onSave={handleEditSave}
          onCancel={() => setEditingTask(null)}
        />
      )}
      <DndContext
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
      >
        <div className="flex flex-1 gap-4 p-4 overflow-hidden">
          {COLUMNS.map((col) => (
            <DroppableColumn
              key={col.id}
              col={col}
              tasks={tasksByStatus(col.id)}
              isAdding={addingToColumn === col.id}
              isOver={overColumnId === col.id}
              onMove={moveTask}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onAddClick={() => setAddingToColumn(col.id)}
              onAddSubmit={handleAddSubmit}
              onAddCancel={() => setAddingToColumn(null)}
            />
          ))}
        </div>
        <DragOverlay>
          {activeTask ? (
            <div className="bg-[#0f1a0f] border border-[#39ff14] rounded-sm p-3 text-xs text-[#00ff41] opacity-90 shadow-lg shadow-[#00ff4133]">
              <span className="font-bold">{activeTask.title}</span>
            </div>
          ) : null}
        </DragOverlay>
      </DndContext>
    </>
  );
}
