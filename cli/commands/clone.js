const fs = require("fs");
const path = require("path");
const axios = require("axios");
const chalk = require("chalk");
const extractZip = require("../utils/extractZip.js");
const { BACKEND_URL } = require("../config.js");

const clone = async (repository) => {
  try {
    // Validate repository format
    // Expected: username/repository-slug
    const parts = repository.split("/");

    if (parts.length !== 2) {
      console.log(chalk.red("Invalid repository format."));
      console.log("Example: repoverse clone manasvi/demo-project");
      return;
    }

    const username = parts[0];
    const slug = parts[1];

    console.log("Fetching repository details...");

    // Fetch repository information
    const response = await axios.get(
      `${BACKEND_URL}/api/repositories/clone/${username}/${slug}`,
    );

    const repo = response.data.data;

    // Create project folder
    const projectPath = path.join(process.cwd(), repo.name);

    if (fs.existsSync(projectPath)) {
      console.log(chalk.red("Folder already exists."));
      return;
    }

    fs.mkdirSync(projectPath);

    // Create .repoverse directory
    const repoversePath = path.join(projectPath, ".repoverse");

    fs.mkdirSync(repoversePath);

    // Create commits folder
    fs.mkdirSync(path.join(repoversePath, "commits"));

    // HEAD
    fs.writeFileSync(path.join(repoversePath, "HEAD"), "null");

    // index.json
    fs.writeFileSync(
      path.join(repoversePath, "index.json"),
      JSON.stringify(
        {
          stagedFiles: [],
        },
        null,
        4,
      ),
    );

    // config.json
    const config = {
      repositoryId: repo._id,
      repositoryName: repo.name,
      backendUrl: BACKEND_URL,
      token: null,
      user: null,
    };

    fs.writeFileSync(
      path.join(repoversePath, "config.json"),
      JSON.stringify(config, null, 4),
    );

    // Download latest repository snapshot
    console.log("Downloading latest snapshot...");

    const zipPath = path.join(repoversePath, "snapshot.zip");

    const zipResponse = await axios({
      method: "GET",
      url: `${BACKEND_URL}/api/commits/clone/${repo._id}`,
      responseType: "stream",
    });

    // Save ZIP to disk
    const writer = fs.createWriteStream(zipPath);

    zipResponse.data.pipe(writer);

    await new Promise((resolve, reject) => {
      writer.on("finish", resolve);
      writer.on("error", reject);
    });

    //console.log("Snapshot downloaded.");

    // Extract ZIP into project folder
    console.log("Extracting files...");

    await extractZip(zipPath, projectPath);

    //console.log("Files extracted.");

    // Remove temporary ZIP
    fs.unlinkSync(zipPath);

    // Update HEAD
    // Backend sends latest commit id in header
    const latestCommit = zipResponse.headers["x-commit-id"] || "";

    fs.writeFileSync(path.join(repoversePath, "HEAD"), latestCommit);

    console.log(chalk.green("\nRepository cloned successfully."));
    console.log(`Location: ${projectPath}`);
  } catch (error) {
    console.log(chalk.red(error.response?.data?.message || error.message));
  }
};

module.exports = clone;
