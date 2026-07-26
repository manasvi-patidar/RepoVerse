import IssueCard from "./IssueCard";

function IssueList({ issues, onEdit, onDelete }) {
  if (issues.length === 0) {
    return (
      <p
        style={{
          color: "#6b7280",
        }}
      >
        No issues found.
      </p>
    );
  }

  return (
    <div
      style={{
        display: "grid",
        gap: "18px",
      }}
    >
      {issues.map((issue) => (
        <IssueCard
          key={issue._id}
          issue={issue}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}

export default IssueList;
