const fs = require("fs");
const path = require("path");
const axios = require("axios");
const chalk = require("chalk");
const FormData = require("form-data");

const createZip = require("../utils/createZip");

const push = async () => {
  try {
    const root = process.cwd();

    const repoPath = path.join(root, ".repoverse");

    const config = JSON.parse(
      fs.readFileSync(path.join(repoPath, "config.json"), "utf-8"),
    );

    if (!fs.existsSync(repoPath)) {
      console.log("Initialize RepoVerse first.");
      return;
    }

    const head = fs.readFileSync(path.join(repoPath, "HEAD"), "utf-8");

    if (head === "null") {
      console.log("Nothing to push.");
      return;
    }

    const commitFolder = path.join(repoPath, "commits", head);

    // this loads the commit information
    const metadata = JSON.parse(
      fs.readFileSync(path.join(commitFolder, "metadata.json"), "utf-8"),
    );

    const snapshotFolder = path.join(commitFolder, "snapshot");

    const zipPath = path.join(commitFolder, "snapshot.zip");

    // Create snapshot.zip
    await createZip(snapshotFolder, zipPath);

    const form = new FormData(); // FormData is used when sending files + text in the same HTTP request

    form.append("metadata", JSON.stringify(metadata)); // adds the commit information as a text field

    form.append("snapshot", fs.createReadStream(zipPath));

    const response = await axios.post(
      `${config.backendUrl}/api/commits/push`,

      form,

      {
        headers: {
          ...form.getHeaders(),
          Authorization: `Bearer ${config.token}`, // token comes from .repoverse/config.json
        },
      },
    );

    // Remove temporary zip
    fs.unlinkSync(zipPath);

    console.log(response.data.message);
  } catch (error) {
    console.log(error.response?.data || error.message);
  }
};

module.exports = push;
