const fs = require("fs");
const path = require("path");
const axios = require("axios");
const chalk = require("chalk");

const extractZip = require("../utils/extractZip.js");

const pull = async () => {
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

    if (!config.repositoryId) {
      console.log(chalk.red("Repository not linked."));
      return;
    }

    const zipPath = path.join(repoPath, "snapshot.zip");

    const response = await axios({
      method: "GET",
      url: `${config.backendUrl}/api/commits/pull/${config.repositoryId}`,
      responseType: "stream",
      headers: {
        Authorization: `Bearer ${config.token}`,
      },
    });

    const latestCommitId = response.headers["x-commit-id"];

    const writer = fs.createWriteStream(zipPath);

    response.data.pipe(writer);

    await new Promise((resolve, reject) => {
      writer.on("finish", resolve);
      writer.on("error", reject);
    });

    await extractZip(zipPath, root);

    //update .repoverse/HEAD after every successful repoverse pull
    if (latestCommitId) {
      fs.writeFileSync(path.join(repoPath, "HEAD"), latestCommitId);
    }

    fs.unlinkSync(zipPath); // removes the temporary ZIP

    console.log(chalk.green("Pull completed successfully."));
  } catch (error) {
    console.log(chalk.red(error.response?.data || error.message));
  }
};

module.exports = pull;
