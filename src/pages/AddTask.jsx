import { useState } from "react";
import { useNavigate } from "react-router-dom";

function AddTask() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    priority: "Medium",
    category: "Academic",
    dueDate: "2026-08-28",
    status: "Raised",
  });

  const handleChange = (e) => {

    const { name, value } = e.target;

    setFormData((current) => ({
      ...current,
      [name]: value,
    }));

  };

  const handleSubmit = (e) => {

    e.preventDefault();

    const savedTasks =
      localStorage.getItem("taskflow-tasks");

    const tasks = savedTasks
      ? JSON.parse(savedTasks)
      : [];

    const newTask = {

      id: `TSK-${String(
        Date.now()
      ).slice(-6)}`,

      ...formData,

      raisedAt:
        new Date().toISOString(),

    };

    localStorage.setItem(
      "taskflow-tasks",
      JSON.stringify([
        newTask,
        ...tasks,
      ])
    );

    navigate(`/tasks/${newTask.id}`);

  };

  return (
    <div className="page">

      <div className="page-header">

        <div>

          <span className="eyebrow">
            TASK MANAGEMENT
          </span>

          <h1>Create New Task</h1>

          <p>
            Add a new task to your workspace.
          </p>

        </div>

      </div>

      <form
        className="task-form"
        onSubmit={handleSubmit}
      >

        <div className="form-group">

          <label>Task Header</label>

          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter task title"
            required
          />

        </div>

        <div className="form-group">

          <label>Task Description</label>

          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Describe the task..."
            rows="5"
            required
          />

        </div>

        <div className="form-row">

          <div className="form-group">

            <label>Priority</label>

            <select
              name="priority"
              value={formData.priority}
              onChange={handleChange}
            >

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

          </div>

          <div className="form-group">

            <label>Category</label>

            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
            >

              <option value="Academic">
                Academic
              </option>

              <option value="Personal">
                Personal
              </option>

            </select>

          </div>

        </div>

        <div className="form-row">

          <div className="form-group">

            <label>Due Date</label>

            <input
              type="date"
              name="dueDate"
              value={formData.dueDate}
              onChange={handleChange}
              required
            />

          </div>

          <div className="form-group">

            <label>Status</label>

            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
            >

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

        </div>

        <div className="form-actions">

          <button
            type="button"
            className="secondary-button"
            onClick={() => navigate("/tasks")}
          >
            Cancel
          </button>

          <button
            type="submit"
            className="primary-button"
          >
            Create Task
          </button>

        </div>

      </form>

    </div>
  );
}

export default AddTask;