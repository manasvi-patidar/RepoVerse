const fs = require("fs");
const path = require("path");
const chalk = require("chalk");

const hashFile = require("../utils/hashFile.js");

const IGNORE = [".repoverse", ".git", "node_modules", ".env", "dist", "build"];

const add = (target = ".") => {
  try {
    const root = process.cwd();

    const repoPath = path.join(root, ".repoverse");

    if (!fs.existsSync(repoPath)) {
      console.log("Initialize RepoVerse first.");
      return;
    }

    const indexPath = path.join(repoPath, "index.json");

    const index = JSON.parse(fs.readFileSync(indexPath, "utf-8"));

    const stagedFiles = [];

    const walk = (currentPath) => {
      const stats = fs.statSync(currentPath);

      const relativePath = path.relative(root, currentPath);

      // Get only the current file/folder name
      const name = path.basename(currentPath);

      // Skip ignored folders/files (except the project root)
      if (relativePath !== "" && IGNORE.includes(name)) {
        return;
      }

      if (stats.isDirectory()) {
        const files = fs.readdirSync(currentPath);

        for (const file of files) {
          walk(path.join(currentPath, file));
        }
      } else {
        stagedFiles.push({
          path: relativePath.replace(/\\/g, "/"), // Store forward slashes on every OS
          hash: hashFile(currentPath),
        });
      }
    };

    const targetPath = path.resolve(target);

    walk(targetPath);

    // Remove duplicates
    index.stagedFiles = [
      ...new Map( //Map uses the file path as a unique key, so duplicates are replaced instead of added
        [...index.stagedFiles, ...stagedFiles].map((file) => [file.path, file]),
      ).values(),
    ];

    //writes the updated index.json back to disk
    fs.writeFileSync(indexPath, JSON.stringify(index, null, 4));

    console.log("\nStaged Files:");

    stagedFiles.forEach((file) => {
      console.log(`✓ ${file.path}`);
    });

    console.log(
      `${chalk.green("✔")} ${chalk.cyan(stagedFiles.length)} file(s) staged successfully.`,
    );
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = add;
