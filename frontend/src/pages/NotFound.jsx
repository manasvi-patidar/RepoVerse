import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="container section" style={{ textAlign: "center" }}>
      <h1>404</h1>

      <p className="text-muted">The page you're looking for doesn't exist.</p>

      <br />

      <Link to="/" className="btn btn-primary">
        Back to Home
      </Link>
    </div>
  );
}

export default NotFound;
