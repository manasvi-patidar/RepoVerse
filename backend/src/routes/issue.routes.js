const express = require("express");

const {
  createIssue,
  getRepositoryIssues,
  updateIssue,
  deleteIssue,
} = require("../controllers/issue.controller.js");

const authMiddleware = require("../middleware/auth.middleware.js");

const router = express.Router();

router.post("/", authMiddleware, createIssue);
router.get("/:repositoryId", authMiddleware, getRepositoryIssues);
router.put("/:issueId", authMiddleware, updateIssue);
router.delete("/:issueId", authMiddleware, deleteIssue);

module.exports = router;
