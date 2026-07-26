const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/auth.middleware.js");
const upload = require("../middleware/upload.middleware.js");
const {
  pushCommit,
  pullCommit,
  cloneCommit,
  revertCommit,
  getCommitHistory,
} = require("../controllers/commit.controller.js");

router.post(
  "/push",
  authMiddleware,
  upload.single("snapshot"), // upload one zip file
  pushCommit,
);

// Public clone route
router.get("/clone/:repositoryId", cloneCommit);

// Authenticated routes
router.get("/pull/:repositoryId", authMiddleware, pullCommit);
router.get("/revert/:commitId", authMiddleware, revertCommit);
router.get("/log/:repositoryId", authMiddleware, getCommitHistory);

module.exports = router;
