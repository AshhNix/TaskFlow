import { useEffect, useState } from "react";
import {
  useNavigate,
  useParams,
} from "react-router-dom";

function EditTask() {

  const { taskId } = useParams();

  const navigate = useNavigate();

  const [formData, setFormData] = useState(null);

  useEffect(() => {

    const savedTasks =
      localStorage.getItem("taskflow-tasks");

    const tasks = savedTasks
      ? JSON.parse(savedTasks)
      : [];

    const task = tasks.find(
      (item) => item.id === taskId
    );

    setFormData(task);

  }, [taskId]);

  if (!formData) {
    return (
      <div className="page">
        <div className="empty-state">
          <h2>Task not found</h2>
        </div>
      </div>
    );
  }

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

    const updatedTasks = tasks.map(
      (task) =>
        task.id === taskId
          ? formData
          : task
    );

    localStorage.setItem(
      "taskflow-tasks",
      JSON.stringify(updatedTasks)
    );

    navigate(`/tasks/${taskId}`);

  };

  return (
    <div className="page">

      <div className="page-header">

        <div>

          <span className="eyebrow">
            TASK MANAGEMENT
          </span>

          <h1>Edit Task</h1>

          <p>
            Update the information for {taskId}.
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
            required
          />

        </div>

        <div className="form-group">

          <label>Task Description</label>

          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
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
            onClick={() =>
              navigate(`/tasks/${taskId}`)
            }
          >
            Cancel
          </button>

          <button
            type="submit"
            className="primary-button"
          >
            Save Changes
          </button>

        </div>

      </form>

    </div>
  );
}

export default EditTask;