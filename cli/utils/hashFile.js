const fs = require("fs");
const crypto = require("crypto");

const hashFile = (filePath) => {
  const fileBuffer = fs.readFileSync(filePath);

  return crypto
    .createHash("sha256") // creates a SHA-256 hashing object
    .update(fileBuffer)
    .digest("hex"); //returns a hexadecimal string
};

module.exports = hashFile;
