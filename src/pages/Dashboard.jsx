import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import initialTasks from "../data/initialTasks";

function Dashboard() {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("taskflow-tasks");

    return savedTasks
      ? JSON.parse(savedTasks)
      : initialTasks;
  });

  useEffect(() => {
    localStorage.setItem(
      "taskflow-tasks",
      JSON.stringify(tasks)
    );
  }, [tasks]);

  const totalTasks = tasks.length;

  const pendingTasks = tasks.filter(
    (task) => task.status === "Pending"
  ).length;

  const raisedTasks = tasks.filter(
    (task) => task.status === "Raised"
  ).length;

  const completedTasks = tasks.filter(
    (task) => task.status === "Closed"
  ).length;

  const highPriority = tasks.filter(
    (task) => task.priority === "High"
  ).length;

  return (
    <div className="page">

      <div className="page-header">

        <div>
          <span className="eyebrow">WORKSPACE OVERVIEW</span>

          <h1>Good morning 👋</h1>

          <p>
            Here's what's happening with your tasks today.
          </p>
        </div>

        <Link
          to="/tasks/add"
          className="primary-button"
        >
          + Create Task
        </Link>

      </div>

      <section className="stats-grid">

        <div className="stat-card">
          <span>Total Tasks</span>
          <strong>{totalTasks}</strong>
          <small>All assigned tasks</small>
        </div>

        <div className="stat-card">
          <span>Pending</span>
          <strong>{pendingTasks}</strong>
          <small>Tasks in progress</small>
        </div>

        <div className="stat-card">
          <span>Raised</span>
          <strong>{raisedTasks}</strong>
          <small>Recently created</small>
        </div>

        <div className="stat-card">
          <span>Completed</span>
          <strong>{completedTasks}</strong>
          <small>Successfully closed</small>
        </div>

      </section>

      <section className="dashboard-grid">

        <div className="dashboard-panel">

          <div className="panel-header">
            <div>
              <span className="eyebrow">
                RECENT ACTIVITY
              </span>

              <h2>Latest Tasks</h2>
            </div>

            <Link to="/tasks">
              View all
            </Link>
          </div>

          <div className="task-preview-list">

            {tasks.slice(0, 4).map((task) => (

              <Link
                to={`/tasks/${task.id}`}
                className="task-preview"
                key={task.id}
              >

                <div>

                  <span className="task-id">
                    {task.id}
                  </span>

                  <h3>{task.title}</h3>

                </div>

                <span
                  className={`priority priority-${task.priority.toLowerCase()}`}
                >
                  {task.priority}
                </span>

              </Link>

            ))}

          </div>

        </div>

        <div className="dashboard-panel">

          <span className="eyebrow">
            PRIORITY
          </span>

          <h2>Focus Overview</h2>

          <div className="focus-number">
            {highPriority}
          </div>

          <p>
            high-priority task
            {highPriority !== 1 ? "s" : ""} currently
            requiring attention.
          </p>

          <Link
            to="/tasks?priority=High"
            className="secondary-button"
          >
            Review priorities
          </Link>

        </div>

      </section>

    </div>
  );
}

export default Dashboard;