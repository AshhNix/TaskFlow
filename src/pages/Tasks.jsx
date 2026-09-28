import { useEffect, useState } from "react";
import TaskCard from "../components/TaskCard";
import initialTasks from "../data/initialTasks";

function Tasks() {
  const [tasks, setTasks] = useState([]);

  const [priority, setPriority] = useState("All");
  const [category, setCategory] = useState("All");
  const [status, setStatus] = useState("All");

  // Load tasks
  useEffect(() => {
    const savedTasks = localStorage.getItem("taskflow-tasks");

    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    } else {
      setTasks(initialTasks);
      localStorage.setItem(
        "taskflow-tasks",
        JSON.stringify(initialTasks)
      );
    }
  }, []);

  // Save tasks
  useEffect(() => {
    if (tasks.length > 0) {
      localStorage.setItem(
        "taskflow-tasks",
        JSON.stringify(tasks)
      );
    }
  }, [tasks]);

  // Filter tasks
  const filteredTasks = tasks.filter((task) => {
    return (
      (priority === "All" || task.priority === priority) &&
      (category === "All" || task.category === category) &&
      (status === "All" || task.status === status)
    );
  });

  // Delete task
  const handleDelete = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this task?"
    );

    if (!confirmDelete) {
      return;
    }

    setTasks(
      tasks.filter((task) => task.id !== id)
    );
  };

  // Complete task
  const handleComplete = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id
          ? { ...task, status: "Closed" }
          : task
      )
    );
  };

  return (
    <div className="page">

      {/* Page Header */}
      <div className="page-header">
        <div>
          <span className="eyebrow">
            TASK MANAGEMENT
          </span>

          <h1>All Tasks</h1>

          <p>
            Create, organize and track your work.
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="filters">

        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
        >
          <option value="All">
            All Priorities
          </option>

          <option value="High">
            High
          </option>

          <option value="Medium">
            Medium
          </option>

          <option value="Low">
            Low
          </option>
        </select>

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="All">
            All Categories
          </option>

          <option value="Academic">
            Academic
          </option>

          <option value="Personal">
            Personal
          </option>
        </select>

        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="All">
            All Status
          </option>

          <option value="Raised">
            Raised
          </option>

          <option value="Pending">
            Pending
          </option>

          <option value="Closed">
            Closed
          </option>
        </select>

      </div>

      {/* Task List */}
      <div className="task-grid">

        {filteredTasks.length > 0 ? (

          filteredTasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onDelete={handleDelete}
              onComplete={handleComplete}
            />
          ))

        ) : (

          <div className="empty-state">
            <h2>No tasks found</h2>

            <p>
              Try changing your filters or add a new task.
            </p>
          </div>

        )}

      </div>

    </div>
  );
}

export default Tasks;
