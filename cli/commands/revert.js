const fs = require("fs");
const path = require("path");
const axios = require("axios");
const chalk = require("chalk");

const extractZip = require("../utils/extractZip.js");

const revert = async (commitId) => {
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

    if (!config.token) {
      console.log(chalk.red("Login first."));
      return;
    }

    const zipPath = path.join(repoPath, "snapshot.zip");

    const response = await axios({
      method: "GET",
      url: `${config.backendUrl}/api/commits/revert/${commitId}`,
      responseType: "stream",
      headers: {
        Authorization: `Bearer ${config.token}`,
      },
    });

    const revertedCommitId = response.headers["x-commit-id"];

    const writer = fs.createWriteStream(zipPath);

    response.data.pipe(writer);

    await new Promise((resolve, reject) => {
      writer.on("finish", resolve);
      writer.on("error", reject);
    });

    await extractZip(zipPath, root);

    if (revertedCommitId) {
      fs.writeFileSync(path.join(repoPath, "HEAD"), revertedCommitId);
    }

    fs.unlinkSync(zipPath);

    console.log(chalk.green("Repository reverted successfully."));
  } catch (error) {
    console.log(chalk.red(error.response?.data || error.message));
  }
};

module.exports = revert;
