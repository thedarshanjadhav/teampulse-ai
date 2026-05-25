import { Task } from "../App";

interface Props {
  tasks: Task[];
  onUpdate: (tasks: Task[]) => void;
}

const COLUMNS: { key: Task["status"]; label: string; emoji: string }[] = [
  { key: "todo", label: "To Do", emoji: "📌" },
  { key: "inprogress", label: "In Progress", emoji: "⚡" },
  { key: "done", label: "Done", emoji: "✅" },
];

export default function TaskBoard({ tasks, onUpdate }: Props) {
  const moveTask = (id: string, status: Task["status"]) => {
    onUpdate(tasks.map((t) => (t.id === id ? { ...t, status } : t)));
  };

  return (
    <div className="card">
      <h2>🗂 Task Board</h2>
      <div className="board">
        {COLUMNS.map((col) => (
          <div key={col.key} className="column">
            <h3>
              {col.emoji} {col.label}
              <span className="count">
                {tasks.filter((t) => t.status === col.key).length}
              </span>
            </h3>
            <div className="task-list">
              {tasks
                .filter((t) => t.status === col.key)
                .map((task) => (
                  <div key={task.id} className="task-card">
                    <p className="task-title">{task.title}</p>
                    <p className="task-owner">👤 {task.owner}</p>
                    <div className="task-actions">
                      {col.key !== "todo" && (
                        <button
                          onClick={() =>
                            moveTask(
                              task.id,
                              col.key === "inprogress" ? "todo" : "inprogress",
                            )
                          }
                        >
                          ← Back
                        </button>
                      )}
                      {col.key !== "done" && (
                        <button
                          onClick={() =>
                            moveTask(
                              task.id,
                              col.key === "todo" ? "inprogress" : "done",
                            )
                          }
                        >
                          Next →
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              {tasks.filter((t) => t.status === col.key).length === 0 && (
                <p className="empty">No tasks here</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
