import { useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const location = useLocation();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const isAuthenticated =
    localStorage.getItem("taskflow-auth") === "true";

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  const handleLogin = (e) => {
    e.preventDefault();

    if (username.trim() && password.trim()) {
      localStorage.setItem("taskflow-auth", "true");

      const destination = location.state?.from?.pathname || "/";

      navigate(destination, { replace: true });
    }
  };

  return (
    <div className="login-page">

      <div className="login-card">

        <div className="login-brand">
          <div className="brand-mark">T</div>

          <div>
            <h1>TaskFlow</h1>
            <span>Task Management System</span>
          </div>
        </div>

        <div className="login-heading">
          <h2>Welcome back</h2>
          <p>Sign in to manage your tasks.</p>
        </div>

        <form onSubmit={handleLogin}>

          <div className="form-group">
            <label>Username</label>

            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter username"
              required
            />
          </div>

          <div className="form-group">
            <label>Password</label>

            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              required
            />
          </div>

          <button className="primary-button login-button">
            Sign In
          </button>

        </form>

        <p className="login-note">
          Demo authentication — enter any username and password.
        </p>

      </div>

    </div>
  );
}

export default Login;