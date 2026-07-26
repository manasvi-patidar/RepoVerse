//purpose: snapshot/ to snapshot.zip

const fs = require("fs");
const { ZipArchive } = require("archiver");

const createZip = (source, destination) => {
  return new Promise((resolve, reject) => {
    const output = fs.createWriteStream(destination);

    const archive = new ZipArchive({
      zlib: { level: 9 }, // maximum compression
    });

    output.on("close", resolve);

    archive.on("error", reject);

    archive.pipe(output); // pipe() sends the compressed data into the output file

    archive.directory(source, false); // compresses the entire source directory

    archive.finalize(); // finalize() actually starts creating the ZIP
  });
};

module.exports = createZip;
