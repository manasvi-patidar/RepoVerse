const fs = require("fs");
const unzipper = require("unzipper");

const extractZip = async (zipPath, destination) => {
  await fs
    .createReadStream(zipPath)
    .pipe(unzipper.Extract({ path: destination }))
    .promise();
};

module.exports = extractZip;
