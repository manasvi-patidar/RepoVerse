const fs = require("fs");
const path = require("path");
const chalk = require("chalk");
const { v4: uuidv4 } = require("uuid");

const commit = (options) => {
  try {
    const message = options.message; // Commander passes all CLI options inside the options object

    // prevents users from committing before running repoverse init
    if (!message) {
      console.log(chalk.red("Commit message is required."));
      return;
    }

    const root = process.cwd();

    const repoPath = path.join(root, ".repoverse");

    if (!fs.existsSync(repoPath)) {
      console.log(chalk.red("Initialize RepoVerse first."));
      return;
    }

    const indexPath = path.join(repoPath, "index.json");

    const index = JSON.parse(fs.readFileSync(indexPath, "utf-8"));

    if (index.stagedFiles.length === 0) {
      console.log(chalk.red("Nothing to commit."));
      return;
    }

    const commitId = uuidv4();

    const commitFolder = path.join(repoPath, "commits", commitId);

    const snapshotFolder = path.join(commitFolder, "snapshot");

    fs.mkdirSync(commitFolder);

    fs.mkdirSync(snapshotFolder);

    // Copy every staged file into snapshot
    index.stagedFiles.forEach((file) => {
      const source = path.join(root, file.path);

      const destination = path.join(snapshotFolder, file.path);

      fs.mkdirSync(path.dirname(destination), {
        // creates missing folders automatically if doesn't exist already
        recursive: true,
      });

      fs.copyFileSync(source, destination); // copies the file into the snapshot
    });

    // Read previous HEAD
    const headPath = path.join(repoPath, "HEAD");

    const parentCommit = fs.readFileSync(headPath, "utf-8");

    const config = JSON.parse(
      fs.readFileSync(path.join(repoPath, "config.json"), "utf-8"),
    );

    const metadata = {
      commitId,

      repositoryId: config.repositoryId,

      message,

      parentCommit: parentCommit === "null" ? null : parentCommit,

      timestamp: new Date().toISOString(),

      files: index.stagedFiles,
    };

    fs.writeFileSync(
      path.join(commitFolder, "metadata.json"),

      JSON.stringify(metadata, null, 4),
    );

    // Update HEAD
    fs.writeFileSync(headPath, commitId);

    // Clear staging area
    fs.writeFileSync(
      indexPath,

      JSON.stringify(
        {
          stagedFiles: [],
        },
        null,
        4,
      ),
    );

    console.log(chalk.green("Commit created successfully."));

    console.log(commitId);
  } catch (error) {
    console.log(chalk.red(error.message));
  }
};

module.exports = commit;
