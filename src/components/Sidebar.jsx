import { NavLink, useNavigate } from "react-router-dom";

function Sidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("taskflow-auth");
    navigate("/login");
  };

  return (
    <aside className="sidebar">

      <div className="sidebar-brand">

        <div className="brand-mark">
          T
        </div>

        <div>
          <h2>TaskFlow</h2>
          <span>Workspace</span>
        </div>

      </div>

      <nav className="sidebar-nav">

        <p className="nav-label">MAIN</p>

        <NavLink
          to="/"
          end
          className={({ isActive }) =>
            isActive ? "nav-item active" : "nav-item"
          }
        >
          <span>⌂</span>
          Dashboard
        </NavLink>

        <NavLink
          to="/tasks"
          end
          className={({ isActive }) =>
            isActive ? "nav-item active" : "nav-item"
          }
        >
          <span>✓</span>
          Tasks
        </NavLink>

        <NavLink
          to="/tasks/add"
          className={({ isActive }) =>
            isActive ? "nav-item active" : "nav-item"
          }
        >
          <span>＋</span>
          Add Task
        </NavLink>

        <NavLink
          to="/completed"
          className={({ isActive }) =>
            isActive ? "nav-item active" : "nav-item"
          }
        >
          <span>✓</span>
          Completed
        </NavLink>

      </nav>

      <div className="sidebar-bottom">

        <button
          className="logout-button"
          onClick={handleLogout}
        >
          <span>↪</span>
          Sign Out
        </button>

      </div>

    </aside>
  );
}

export default Sidebar;