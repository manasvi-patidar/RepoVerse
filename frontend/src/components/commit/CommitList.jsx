import CommitCard from "./CommitCard.jsx";

function CommitList({ commits }) {
  if (commits.length === 0) {
    return (
      <p
        style={{
          color: "#6b7280",
        }}
      >
        No commits yet.
      </p>
    );
  }

  return (
    <div
      style={{
        display: "grid",
        gap: "16px",
      }}
    >
      {commits.map((commit) => (
        <CommitCard key={commit._id} commit={commit} />
      ))}
    </div>
  );
}

export default CommitList;
