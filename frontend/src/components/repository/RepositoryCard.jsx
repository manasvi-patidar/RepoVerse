import { Link } from "react-router-dom";
import "./Repository.css";

function RepositoryCard({ repository }) {
  return (
    <Link to={`/repository/${repository._id}`} className="repository-card">
      <div className="repository-header">
        <h3>{repository.name}</h3>

        <span className={`visibility ${repository.visibility}`}>
          {repository.visibility}
        </span>
      </div>

      <p className="repository-description">
        {repository.description || "No description provided."}
      </p>

      <div className="repository-footer">
        <small>
          Updated {new Date(repository.updatedAt).toLocaleDateString()}
        </small>

        <small>{repository.slug}</small>
      </div>
    </Link>
  );
}

export default RepositoryCard;
