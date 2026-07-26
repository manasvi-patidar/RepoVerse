function CommitCard({ commit }) {
  return (
    <div className="repository-card">
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "12px",
        }}
      >
        <strong>{commit.message}</strong>

        <small
          style={{
            color: "#6b7280",
            fontFamily: "monospace",
          }}
        >
          {commit.commitId.slice(0, 8)}
        </small>
      </div>

      <p
        style={{
          color: "#6b7280",
          marginBottom: "12px",
        }}
      >
        by {commit.author?.name}
      </p>

      <small
        style={{
          color: "#9ca3af",
        }}
      >
        {new Date(commit.createdAt).toLocaleString()}
      </small>
    </div>
  );
}

export default CommitCard;
