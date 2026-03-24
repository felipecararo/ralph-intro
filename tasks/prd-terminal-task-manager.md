# PRD: Terminal Task Manager

## Introduction

A personal Kanban board with a terminal/hacker aesthetic — monospace fonts, green-on-black color scheme, and CLI-inspired UI. Users manage their tasks across three columns (To Do / In Progress / Done) with drag-and-drop support. All data persists via `localStorage`, no backend required.

The goal is to feel like a tool a hacker would actually use: fast, keyboard-friendly, visually distinctive, and free of unnecessary complexity.

---

## Goals

- Provide a frictionless personal task board with zero setup
- Deliver a visually immersive terminal/hacker aesthetic
- Persist tasks locally without any backend or login
- Support full CRUD operations on tasks
- Enable drag-and-drop to move tasks between columns
- Be fully usable via keyboard shortcuts

---

## User Stories

### US-001: View Kanban board with terminal aesthetic
**Description:** As a user, I want to see my task board styled like a terminal so that it feels fast and immersive.

**Acceptance Criteria:**
- [ ] Page renders three columns: `[ TO_DO ]`, `[ IN_PROGRESS ]`, `[ DONE ]`
- [ ] Background is black (`#000000` or `#0a0a0a`)
- [ ] All text uses a monospace font (e.g. `JetBrains Mono`, `Fira Code`, or system monospace fallback)
- [ ] Primary text and accents are terminal green (`#00ff41` or similar)
- [ ] Column headers styled like terminal section titles (e.g. `> TO_DO_`)
- [ ] A blinking cursor or scanline effect is present somewhere on the page
- [ ] App title displayed as ASCII art or styled header (e.g. `[ TASK_OS v1.0 ]`)
- [ ] Typecheck passes
- [ ] Verify in browser using dev-browser skill

### US-002: Create a new task
**Description:** As a user, I want to add a new task to any column so that I can track new work.

**Acceptance Criteria:**
- [ ] Each column has an `[+ ADD TASK]` button or inline input
- [ ] Clicking it opens an inline form or modal styled as a terminal prompt (e.g. `> ENTER TASK:_`)
- [ ] Task requires a title (non-empty)
- [ ] Optional fields: description, priority (`LOW` | `MED` | `HIGH`)
- [ ] On submit, task appears in the column immediately
- [ ] Task is saved to `localStorage`
- [ ] Press `Escape` to cancel
- [ ] Typecheck passes
- [ ] Verify in browser using dev-browser skill

### US-003: Edit an existing task
**Description:** As a user, I want to edit a task's title, description, and priority so that I can keep it up to date.

**Acceptance Criteria:**
- [ ] Clicking a task card opens an edit modal/panel styled as a terminal editor
- [ ] All fields (title, description, priority) are editable
- [ ] Save button (or `Enter`) persists changes to `localStorage`
- [ ] Cancel button (or `Escape`) discards changes
- [ ] Typecheck passes
- [ ] Verify in browser using dev-browser skill

### US-004: Delete a task
**Description:** As a user, I want to delete a task I no longer need.

**Acceptance Criteria:**
- [ ] Each task card has a `[X]` or `[DEL]` button
- [ ] Clicking it shows a terminal-style confirmation prompt: `> CONFIRM DELETE? [Y/N]_`
- [ ] Confirming removes the task from the board and `localStorage`
- [ ] Cancelling leaves the task untouched
- [ ] Typecheck passes
- [ ] Verify in browser using dev-browser skill

### US-005: Move tasks between columns via drag-and-drop
**Description:** As a user, I want to drag tasks between columns to update their status.

**Acceptance Criteria:**
- [ ] Tasks are draggable across the three columns
- [ ] Drop target column is highlighted on hover during drag
- [ ] Task status updates immediately on drop
- [ ] New status persists to `localStorage`
- [ ] Works on desktop (mouse drag); touch support is a bonus
- [ ] Typecheck passes
- [ ] Verify in browser using dev-browser skill

### US-006: Move tasks via quick-action buttons
**Description:** As a user, I want arrow buttons on each card to move tasks left/right without dragging.

**Acceptance Criteria:**
- [ ] Cards in `IN_PROGRESS` and `DONE` show a `[<<]` button to move left
- [ ] Cards in `TO_DO` and `IN_PROGRESS` show a `[>>]` button to move right
- [ ] Clicking moves the task to the adjacent column instantly
- [ ] Status persists to `localStorage`
- [ ] Typecheck passes
- [ ] Verify in browser using dev-browser skill

### US-007: Persist tasks across page reloads
**Description:** As a user, I want my tasks to still be there when I refresh or reopen the app.

**Acceptance Criteria:**
- [ ] All tasks are read from `localStorage` on app load
- [ ] Any create/edit/delete/move operation immediately writes to `localStorage`
- [ ] If `localStorage` is empty, board shows an empty state message per column (e.g. `> NO TASKS FOUND_`)
- [ ] Typecheck passes

### US-008: Display priority badge on task cards
**Description:** As a user, I want to see a task's priority at a glance on the card.

**Acceptance Criteria:**
- [ ] Priority badge displayed on card: `[HIGH]`, `[MED]`, `[LOW]`
- [ ] Color coding: `HIGH` = red/orange, `MED` = yellow, `LOW` = dim green
- [ ] All styled consistently with terminal aesthetic (monospace, bracketed labels)
- [ ] Typecheck passes
- [ ] Verify in browser using dev-browser skill

### US-009: Keyboard shortcut to create a task
**Description:** As a user, I want to press a key to quickly start adding a task.

**Acceptance Criteria:**
- [ ] Pressing `N` (when not in an input field) opens the new task form in the first column (`TO_DO`)
- [ ] A keyboard shortcut legend is visible on the page (e.g. `[N] NEW  [ESC] CANCEL  [DEL] DELETE`)
- [ ] Typecheck passes
- [ ] Verify in browser using dev-browser skill

---

## Functional Requirements

- **FR-1:** Three fixed columns: `TO_DO`, `IN_PROGRESS`, `DONE` — columns cannot be added, renamed, or deleted
- **FR-2:** Tasks have: `id` (uuid), `title` (string, required), `description` (string, optional), `priority` (`LOW` | `MED` | `HIGH`, default `MED`), `status` (`TODO` | `IN_PROGRESS` | `DONE`), `createdAt` (ISO timestamp)
- **FR-3:** All task state stored and read from `localStorage` under key `task_os_tasks`
- **FR-4:** Drag-and-drop implemented using the HTML5 Drag and Drop API or a lightweight library (e.g. `@dnd-kit/core`)
- **FR-5:** Priority badge color: `HIGH` = `#ff4444`, `MED` = `#ffcc00`, `LOW` = `#00aa33`
- **FR-6:** Global keyboard shortcut `N` opens new task form
- **FR-7:** App must render entirely client-side (Next.js with `"use client"` components, no SSR data fetching)
- **FR-8:** Font: load `JetBrains Mono` via `next/font` or Google Fonts
- **FR-9:** Subtle terminal animations allowed: blinking cursor (`_`), scanline overlay, or text boot sequence on first load
- **FR-10:** Task cards display: title, priority badge, truncated description (if any), and action buttons `[<<]` `[>>]` `[EDIT]` `[DEL]`

---

## Non-Goals

- No user authentication or accounts
- No multi-user collaboration or sharing
- No sprints, epics, or subtasks
- No due dates or calendar integration
- No notifications or reminders
- No server-side persistence or API
- No mobile-first design (desktop is the primary target)
- No dark/light mode toggle (always dark terminal)
- No search or filtering

---

## Design Considerations

### Color Palette
| Token | Value | Usage |
|---|---|---|
| `bg-terminal` | `#0a0a0a` | Page background |
| `bg-card` | `#0f1a0f` | Task card background |
| `bg-column` | `#111811` | Column background |
| `text-primary` | `#00ff41` | Main text, borders |
| `text-dim` | `#005c1a` | Subtle text, placeholders |
| `text-accent` | `#39ff14` | Hover states, active |
| `border` | `#00ff4133` | Card/column borders |

### Typography
- All text: monospace font (`JetBrains Mono`)
- Headers: uppercase with bracket notation `[ COLUMN_NAME ]`
- Buttons: uppercase bracket style `[EDIT]` `[DEL]` `[+ ADD]`
- Inputs: styled as terminal prompts `> _`

### Layout
- Full viewport height board
- Three equal-width columns with a thin green border
- Scrollable columns if tasks overflow
- Fixed top bar with app title + keyboard legend

---

## Technical Considerations

- **Framework:** Next.js 14+ with App Router, TypeScript strict mode
- **Styling:** TailwindCSS with custom terminal color tokens in `tailwind.config.ts`
- **Drag-and-drop:** `@dnd-kit/core` (lightweight, accessible, works with React)
- **State management:** React `useState` + `useEffect` for localStorage sync (no external store needed)
- **Font:** `next/font/google` with `JetBrains_Mono`
- **No backend:** All pages should be static/client-rendered; disable SSR for board component if needed

---

## Success Metrics

- Board loads and is interactive in under 1 second
- Tasks survive a hard page refresh (localStorage working)
- All CRUD operations completable without touching a mouse (keyboard + drag)
- Visual aesthetic is immediately recognizable as terminal/hacker style

---

## Open Questions

- Should there be a "boot sequence" animation on first load (simulated terminal startup)?
- Should task cards show a creation timestamp in dim text?
- Should `[DONE]` column auto-strikethrough task titles?
