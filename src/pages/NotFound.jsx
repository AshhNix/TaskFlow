import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="not-found">

      <div>

        <span className="error-code">
          404
        </span>

        <h1>Page not found</h1>

        <p>
          The page you're looking for doesn't exist.
        </p>

        <Link
          to="/"
          className="primary-button"
        >
          Back to Dashboard
        </Link>

      </div>

    </div>
  );
}

export default NotFound;