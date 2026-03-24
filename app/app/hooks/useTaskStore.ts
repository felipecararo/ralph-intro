"use client";

import { useState, useEffect, useCallback } from "react";
import type { Task, TaskStatus } from "../types/task";

const STORAGE_KEY = "task_os_tasks";

function loadTasks(): Task[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Task[]) : [];
  } catch {
    return [];
  }
}

function saveTasks(tasks: Task[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}

export function useTaskStore() {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    setTasks(loadTasks());
  }, []);

  const createTask = useCallback(
    (data: Omit<Task, "id" | "createdAt">) => {
      const newTask: Task = {
        ...data,
        id: crypto.randomUUID(),
        createdAt: new Date().toISOString(),
      };
      setTasks((prev) => {
        const updated = [...prev, newTask];
        saveTasks(updated);
        return updated;
      });
    },
    []
  );

  const updateTask = useCallback((id: string, changes: Partial<Omit<Task, "id" | "createdAt">>) => {
    setTasks((prev) => {
      const updated = prev.map((t) => (t.id === id ? { ...t, ...changes } : t));
      saveTasks(updated);
      return updated;
    });
  }, []);

  const deleteTask = useCallback((id: string) => {
    setTasks((prev) => {
      const updated = prev.filter((t) => t.id !== id);
      saveTasks(updated);
      return updated;
    });
  }, []);

  const moveTask = useCallback((id: string, status: TaskStatus) => {
    setTasks((prev) => {
      const updated = prev.map((t) => (t.id === id ? { ...t, status } : t));
      saveTasks(updated);
      return updated;
    });
  }, []);

  const tasksByStatus = (status: TaskStatus) => tasks.filter((t) => t.status === status);

  return { tasks, tasksByStatus, createTask, updateTask, deleteTask, moveTask };
}
