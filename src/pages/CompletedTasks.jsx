import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function CompletedTasks() {

  const [tasks, setTasks] = useState([]);

  useEffect(() => {

    const savedTasks =
      localStorage.getItem("taskflow-tasks");

    const allTasks = savedTasks
      ? JSON.parse(savedTasks)
      : [];

    setTasks(
      allTasks.filter(
        (task) => task.status === "Closed"
      )
    );

  }, []);

  return (
    <div className="page">

      <div className="page-header">

        <div>

          <span className="eyebrow">
            TASK HISTORY
          </span>

          <h1>Completed Tasks</h1>

          <p>
            Tasks that have been successfully closed.
          </p>

        </div>

      </div>

      {tasks.length === 0 ? (

        <div className="empty-state">

          <h2>No completed tasks</h2>

          <p>
            Completed tasks will appear here.
          </p>

        </div>

      ) : (

        <div className="completed-list">

          {tasks.map((task) => (

            <Link
              key={task.id}
              to={`/tasks/${task.id}`}
              className="completed-item"
            >

              <div>

                <span className="task-id">
                  {task.id}
                </span>

                <h3>{task.title}</h3>

              </div>

              <span className="status status-closed">
                Closed
              </span>

            </Link>

          ))}

        </div>

      )}

    </div>
  );
}

export default CompletedTasks;