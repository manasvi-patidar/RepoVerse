import "./Workflow.css";
import {
  FolderPlus,
  FilePlus2,
  GitCommitHorizontal,
  Upload,
  LayoutDashboard,
} from "lucide-react";

const steps = [
  {
    icon: <FolderPlus size={22} />,
    command: "repoverse init",
    title: "Initialize Repository",
    description:
      "Create a new local repository and prepare it for version tracking.",
  },
  {
    icon: <FilePlus2 size={22} />,
    command: "repoverse add",
    title: "Track Files",
    description: "Select files that should become part of the next commit.",
  },
  {
    icon: <GitCommitHorizontal size={22} />,
    command: "repoverse commit",
    title: "Create Commit",
    description:
      "Save a snapshot of your project with a meaningful commit message.",
  },
  {
    icon: <Upload size={22} />,
    command: "repoverse push",
    title: "Push Changes",
    description: "Upload repository data to the RepoVerse server.",
  },
  {
    icon: <LayoutDashboard size={22} />,
    command: "Dashboard",
    title: "Manage Online",
    description:
      "Browse repositories, commits and issues from the web dashboard.",
  },
];

function Workflow() {
  return (
    <section className="workflow section">
      <div className="container">
        <div className="workflow-header">
          <h2>How RepoVerse Works</h2>

          <p>
            A simple workflow inspired by Git while remaining easy to understand
            for learning and project collaboration.
          </p>
        </div>

        <div className="workflow-list">
          {steps.map((step, index) => (
            <div className="workflow-item" key={step.title}>
              <div className="workflow-icon">{step.icon}</div>

              <div className="workflow-content">
                <span className="workflow-command">{step.command}</span>

                <h3>{step.title}</h3>

                <p>{step.description}</p>
              </div>

              {/* Connector line between steps */}
              {index !== steps.length - 1 && (
                <div className="workflow-line"></div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Workflow;
