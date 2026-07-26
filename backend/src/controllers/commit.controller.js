const Commit = require("../models/Commit.js");
const Repository = require("../models/Repository.js");
const { v4: uuidv4 } = require("uuid");
const fs = require("fs");
const path = require("path");

// Push Commit
const pushCommit = async (req, res) => {
  try {
    // metadata comes as string because it is sent using FormData
    const metadata = JSON.parse(req.body.metadata);

    // Check whether repository exists
    const repository = await Repository.findById(metadata.repositoryId);

    if (!repository) {
      return res.status(404).json({
        success: false,
        message: "Repository not found.",
      });
    }

    // Save commit in MongoDB
    const commit = await Commit.create({
      repository: metadata.repositoryId,
      author: req.user._id,
      commitId: metadata.commitId || uuidv4(),
      message: metadata.message,
      parentCommit: metadata.parentCommit || null,
      isPushed: true,
      zipPath: req.file.path,
    });

    res.status(201).json({
      success: true,
      message: "Commit pushed successfully.",
      data: commit,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Pull Commmit
const pullCommit = async (req, res) => {
  try {
    const { repositoryId } = req.params;

    const latestCommit = await Commit.findOne({
      repository: repositoryId,
      isPushed: true,
    }).sort({ createdAt: -1 }); // return only one newest commit

    if (!latestCommit) {
      return res.status(404).json({
        success: false,
        message: "No commits found.",
      });
    }

    const filePath = path.resolve(latestCommit.zipPath);

    // Send latest commit ID in response header
    res.setHeader("X-Commit-Id", latestCommit.commitId);

    // Send snapshot.zip
    res.download(filePath, "snapshot.zip");
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Public endpoint used only for cloning public repositories
const cloneCommit = async (req, res) => {
  try {
    const { repositoryId } = req.params;

    const Repository = require("../models/Repository.js");

    // Check repository exists
    const repository = await Repository.findById(repositoryId);

    if (!repository) {
      return res.status(404).json({
        success: false,
        message: "Repository not found.",
      });
    }

    // Only public repositories can be cloned
    if (repository.visibility !== "public") {
      return res.status(403).json({
        success: false,
        message: "Repository is private.",
      });
    }

    // Get latest pushed commit
    const latestCommit = await Commit.findOne({
      repository: repositoryId,
      isPushed: true,
    }).sort({ createdAt: -1 });

    if (!latestCommit) {
      return res.status(404).json({
        success: false,
        message: "No commits found.",
      });
    }

    const path = require("path");

    const filePath = path.resolve(latestCommit.zipPath);

    // Send HEAD commit id
    res.setHeader("X-Commit-Id", latestCommit.commitId);

    res.download(filePath, "snapshot.zip");
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Revert commit
const revertCommit = async (req, res) => {
  try {
    const { commitId } = req.params;

    const commit = await Commit.findOne({
      commitId,
      isPushed: true,
    });

    if (!commit) {
      return res.status(404).json({
        success: false,
        message: "Commit not found.",
      });
    }

    const filePath = path.resolve(commit.zipPath);

    res.setHeader("X-Commit-Id", commit.commitId);

    res.download(commit.zipPath, "snapshot.zip");
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getCommitHistory = async (req, res) => {
  try {
    const { repositoryId } = req.params;

    const commits = await Commit.find({
      repository: repositoryId,
      isPushed: true,
    })
      .sort({ createdAt: -1 })
      .populate("author", "name email");

    res.status(200).json({
      success: true,
      commits,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  pushCommit,
  pullCommit,
  cloneCommit,
  revertCommit,
  getCommitHistory,
};
