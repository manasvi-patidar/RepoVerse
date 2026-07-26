const Issue = require("../models/Issue.js");
const Repository = require("../models/Repository.js");

const createIssue = async (req, res) => {
  try {
    const { repositoryId, title, description } = req.body;

    const repository = await Repository.findById(repositoryId);

    if (!repository) {
      return res.status(404).json({
        success: false,
        message: "Repository not found.",
      });
    }

    const issue = await Issue.create({
      repository: repositoryId,
      author: req.user._id,
      title,
      description,
    });

    res.status(201).json({
      success: true,
      message: "Issue created successfully.",
      issue,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getRepositoryIssues = async (req, res) => {
  try {
    const { repositoryId } = req.params;

    const issues = await Issue.find({
      repository: repositoryId,
    })
      .populate("author", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: issues.length,
      issues,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const updateIssue = async (req, res) => {
  try {
    const { issueId } = req.params;

    const { title, description, status } = req.body;

    const issue = await Issue.findById(issueId);

    if (!issue) {
      return res.status(404).json({
        success: false,
        message: "Issue not found.",
      });
    }

    if (title !== undefined) issue.title = title;

    if (description !== undefined) issue.description = description;

    if (status !== undefined) issue.status = status;

    await issue.save();

    res.status(200).json({
      success: true,
      message: "Issue updated successfully.",
      issue,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const deleteIssue = async (req, res) => {
  try {
    const { issueId } = req.params;

    const issue = await Issue.findById(issueId);

    if (!issue) {
      return res.status(404).json({
        success: false,
        message: "Issue not found.",
      });
    }

    await issue.deleteOne();

    res.status(200).json({
      success: true,
      message: "Issue deleted successfully.",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createIssue,
  getRepositoryIssues,
  updateIssue,
  deleteIssue,
};
