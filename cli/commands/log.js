const fs = require("fs");
const path = require("path");
const axios = require("axios");
const chalk = require("chalk");

const log = async () => {
  try {
    const root = process.cwd();

    const repoPath = path.join(root, ".repoverse");

    if (!fs.existsSync(repoPath)) {
      console.log(chalk.red("Initialize RepoVerse first."));
      return;
    }

    const config = JSON.parse(
      fs.readFileSync(path.join(repoPath, "config.json"), "utf-8"),
    );

    const response = await axios.get(
      `${config.backendUrl}/api/commits/log/${config.repositoryId}`,
      {
        headers: {
          Authorization: `Bearer ${config.token}`,
        },
      },
    );

    const commits = response.data.commits;

    if (commits.length === 0) {
      console.log("No commits found.");
      return;
    }

    console.log("\nCommit History : \n");

    commits.forEach((commit) => {
      console.log(`Commit ID : ${commit.commitId}`);
      console.log(`Message   : ${commit.message}`);
      console.log(`Author    : ${commit.author.name}`);
      console.log(`Date      : ${new Date(commit.createdAt).toLocaleString()}`);
      console.log("--------------------------------------");
    });
  } catch (error) {
    console.log(chalk.red(error.response?.data?.message || error.message));
  }
};

module.exports = log;
