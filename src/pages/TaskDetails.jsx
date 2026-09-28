import { useEffect, useState } from "react";
import {
  Link,
  useNavigate,
  useParams,
} from "react-router-dom";

function TaskDetails() {

  const { taskId } = useParams();

  const navigate = useNavigate();

  const [task, setTask] = useState(null);

  useEffect(() => {

    const savedTasks =
      localStorage.getItem("taskflow-tasks");

    const tasks = savedTasks
      ? JSON.parse(savedTasks)
      : [];

    const foundTask = tasks.find(
      (item) => item.id === taskId
    );

    setTask(foundTask);

  }, [taskId]);

  if (!task) {

    return (
      <div className="page">

        <div className="empty-state">

          <h2>Task not found</h2>

          <p>
            The requested task does not exist.
          </p>

          <Link
            to="/tasks"
            className="primary-button"
          >
            Back to Tasks
          </Link>

        </div>

      </div>
    );

  }

  const handleComplete = () => {

    const savedTasks =
      localStorage.getItem("taskflow-tasks");

    const tasks = savedTasks
      ? JSON.parse(savedTasks)
      : [];

    const updatedTasks = tasks.map(
      (item) =>
        item.id === task.id
          ? {
              ...item,
              status: "Closed",
            }
          : item
    );

    localStorage.setItem(
      "taskflow-tasks",
      JSON.stringify(updatedTasks)
    );

    setTask({
      ...task,
      status: "Closed",
    });

  };

  return (
    <div className="page">

      <div className="detail-header">

        <Link
          to="/tasks"
          className="back-link"
        >
          ← Back to Tasks
        </Link>

        <div className="detail-title">

          <div>

            <span className="task-id">
              {task.id}
            </span>

            <h1>{task.title}</h1>

          </div>

          <span
            className={`priority priority-${task.priority.toLowerCase()}`}
          >
            {task.priority}
          </span>

        </div>

      </div>

      <div className="details-layout">

        <div className="detail-main">

          <div className="detail-panel">

            <span className="eyebrow">
              DESCRIPTION
            </span>

            <h2>Task Details</h2>

            <p className="detail-description">
              {task.description}
            </p>

          </div>

        </div>

        <aside className="detail-sidebar">

          <div className="detail-panel">

            <div className="detail-row">
              <span>Status</span>
              <strong>{task.status}</strong>
            </div>

            <div className="detail-row">
              <span>Priority</span>
              <strong>{task.priority}</strong>
            </div>

            <div className="detail-row">
              <span>Category</span>
              <strong>{task.category}</strong>
            </div>

            <div className="detail-row">
              <span>Raised</span>
              <strong>
                {new Date(
                  task.raisedAt
                ).toLocaleString()}
              </strong>
            </div>

            <div className="detail-row">
              <span>Due Date</span>
              <strong>
                {task.dueDate}
              </strong>
            </div>

          </div>

          <div className="detail-actions">

            <Link
              to={`/tasks/${task.id}/edit`}
              className="primary-button"
            >
              Edit Task
            </Link>

            {task.status !== "Closed" && (

              <button
                className="secondary-button"
                onClick={handleComplete}
              >
                Mark as Completed
              </button>

            )}

            <button
              className="danger-button"
              onClick={() =>
                navigate("/tasks")
              }
            >
              Back to Tasks
            </button>

          </div>

        </aside>

      </div>

    </div>
  );
}

export default TaskDetails;