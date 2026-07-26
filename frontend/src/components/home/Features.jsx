import "./Features.css";
import {
  FolderGit2,
  GitCommitHorizontal,
  GitBranch,
  MonitorSmartphone,
} from "lucide-react";

const features = [
  {
    icon: <FolderGit2 size={26} />,
    title: "Repository Management",
    description:
      "Create, organize and manage repositories with a clean and intuitive interface.",
  },
  {
    icon: <GitCommitHorizontal size={26} />,
    title: "Commit Tracking",
    description:
      "Maintain a complete history of changes with meaningful commit messages.",
  },
  {
    icon: <GitBranch size={26} />,
    title: "Version Control",
    description:
      "Visualize development progress while keeping your project history organized.",
  },
  {
    icon: <MonitorSmartphone size={26} />,
    title: "CLI + Dashboard",
    description:
      "Work comfortably from the terminal or monitor everything through the web application.",
  },
];

function Features() {
  return (
    <section className="section">
      <div className="container">
        <div className="features-header">
          <h2>Why RepoVerse?</h2>

          <p>
            Designed to make repository management simple, educational and
            developer friendly.
          </p>
        </div>

        <div className="features-grid">
          {features.map((feature) => (
            <article key={feature.title} className="feature-card card">
              <div className="feature-icon">{feature.icon}</div>

              <h3>{feature.title}</h3>

              <p>{feature.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Features;
