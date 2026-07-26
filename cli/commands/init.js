const fs = require("fs");
const path = require("path");
const chalk = require("chalk");
const { BACKEND_URL } = require("../config.js");

const init = () => {
  const repoPath = path.join(process.cwd(), ".repoverse");

  // Don't initialize twice
  if (fs.existsSync(repoPath)) {
    console.log(chalk.red("RepoVerse repository already initialized."));
    return;
  }

  // Create .repoverse
  fs.mkdirSync(repoPath, { recursive: true });

  // Create commits folder
  fs.mkdirSync(path.join(repoPath, "commits"));

  // Create config.json
  fs.writeFileSync(
    path.join(repoPath, "config.json"),
    JSON.stringify(
      {
        repositoryId: null,
        repositoryName: "",
        backendUrl: BACKEND_URL,
        token: "",
        user: {
          _id: "",
          name: "",
          username: "",
          email: "",
        },
      },
      null,
      4,
    ),
  );

  // Create index.json
  fs.writeFileSync(
    path.join(repoPath, "index.json"),
    JSON.stringify(
      {
        stagedFiles: [],
      },
      null,
      4,
    ),
  );

  // Create HEAD
  fs.writeFileSync(path.join(repoPath, "HEAD"), "null");

  console.log(chalk.green("RepoVerse initialized successfully."));
};

module.exports = init;
