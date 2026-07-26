const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  // multer.diskStorage() tells Multer where and with what name to save uploaded files
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },

  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

module.exports = multer({ storage });
