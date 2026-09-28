import { Link } from "react-router-dom";

function TaskCard({ task, onDelete, onComplete }) {
  return (
    <div className="task-card">

      {/* Top section */}
      <div className="task-card-top">
        <span className="task-id">
          {task.id}
        </span>

        <span
          className={`priority priority-${task.priority.toLowerCase()}`}
        >
          {task.priority}
        </span>
      </div>

      {/* Task information */}
      <h3>{task.title}</h3>

      <p>{task.description}</p>

      {/* Task details */}
      <div className="task-meta">

        <span>
          Category:
          <strong> {task.category}</strong>
        </span>

        <span>
          Due:
          <strong> {task.dueDate}</strong>
        </span>

      </div>

      {/* Status */}
      <div className="task-status-row">
        <span
          className={`status status-${task.status.toLowerCase()}`}
        >
          {task.status}
        </span>
      </div>

      {/* Actions */}
      <div className="task-actions">

        <Link
          to={`/tasks/${task.id}`}
          className="action-button"
        >
          View
        </Link>

        <Link
          to={`/tasks/${task.id}/edit`}
          className="action-button"
        >
          Edit
        </Link>

        {task.status !== "Closed" && (
          <button
            className="action-button complete"
            onClick={() => onComplete(task.id)}
          >
            Complete
          </button>
        )}

        <button
          className="action-button delete"
          onClick={() => onDelete(task.id)}
        >
          Delete
        </button>

      </div>

    </div>
  );
}

export default TaskCard;
