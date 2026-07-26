function IssueCard({ issue, onEdit, onDelete }) {
  return (
    <div className="repository-card">
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
        }}
      >
        <div>
          <h3>{issue.title}</h3>

          <p
            style={{
              marginTop: "10px",
              color: "#6b7280",
              lineHeight: "1.6",
            }}
          >
            {issue.description || "No description."}
          </p>
        </div>

        <span
          className={`visibility ${
            issue.status === "open" ? "public" : "private"
          }`}
        >
          {issue.status}
        </span>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: "18px",
          alignItems: "center",
        }}
      >
        <small
          style={{
            color: "#9ca3af",
          }}
        >
          {issue.author?.name}
        </small>

        <div
          style={{
            display: "flex",
            gap: "10px",
          }}
        >
          <button className="btn" onClick={() => onEdit(issue)}>
            Edit
          </button>

          <button
            className="btn"
            style={{
              color: "#dc2626",
            }}
            onClick={() => onDelete(issue)}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default IssueCard;
