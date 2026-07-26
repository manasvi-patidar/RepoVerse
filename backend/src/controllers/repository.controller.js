const Repository = require("../models/Repository.js");
const User = require("../models/User.js");

// Create Repository
const createRepository = async (req, res) => {
  try {
    const { name, description, visibility } = req.body;

    if (!name) {
      return res.status(400).json({
        success: false,
        message: "Repository name is required.",
      });
    }

    const slug = name
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, "");

    const existingRepo = await Repository.findOne({
      owner: req.user._id,
      slug,
    });

    if (existingRepo) {
      return res.status(409).json({
        success: false,
        message: "Repository with this name already exists.",
      });
    }

    const repository = await Repository.create({
      owner: req.user._id,
      name,
      slug,
      description,
      visibility,
    });

    // Temporary Development Helper
    console.log("\n New Repository : ");
    console.log("Repository Name : ", repository.name);
    console.log("Repository ID   : ", repository._id.toString());
    console.log("Slug            : ", repository.slug);
    console.log("----------------------------------\n");

    res.status(201).json({
      success: true,
      message: "Repository created successfully.",
      data: repository,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get All Repositories of Logged-in User
const getRepositories = async (req, res) => {
  try {
    const repositories = await Repository.find({
      owner: req.user._id,
    }).sort({ createdAt: -1 }); // returns the newest repositories first

    res.status(200).json({
      success: true,
      data: repositories,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get Repository by Id
const getRepository = async (req, res) => {
  try {
    const repository = await Repository.findOne({
      _id: req.params.id,
      owner: req.user._id,
    });

    if (!repository) {
      return res.status(404).json({
        success: false,
        message: "Repository not found.",
      });
    }

    res.status(200).json({
      success: true,
      data: repository,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update Repository
const updateRepository = async (req, res) => {
  try {
    const { name, description, visibility } = req.body;

    const repository = await Repository.findOne({
      _id: req.params.id,
      owner: req.user._id,
    });

    if (!repository) {
      return res.status(404).json({
        success: false,
        message: "Repository not found.",
      });
    }

    if (name) {
      repository.name = name;

      repository.slug = name
        .toLowerCase()
        .trim()
        .replace(/\s+/g, "-")
        .replace(/[^a-z0-9-]/g, "");
    }
    if (description !== undefined) repository.description = description;
    if (visibility) repository.visibility = visibility;

    // prevents duplicate slugs after a rename
    if (name) {
      const slug = name
        .toLowerCase()
        .trim()
        .replace(/\s+/g, "-")
        .replace(/[^a-z0-9-]/g, "");

      const existingRepo = await Repository.findOne({
        owner: req.user._id,
        slug,
        _id: { $ne: repository._id }, // ignore current repository
      });

      if (existingRepo) {
        return res.status(409).json({
          success: false,
          message: "Repository with this name already exists.",
        });
      }

      repository.name = name;
      repository.slug = slug;
    }

    await repository.save();

    res.status(200).json({
      success: true,
      message: "Repository updated successfully.",
      data: repository,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete Repository
const deleteRepository = async (req, res) => {
  try {
    const repository = await Repository.findOne({
      _id: req.params.id,
      owner: req.user._id,
    });

    if (!repository) {
      return res.status(404).json({
        success: false,
        message: "Repository not found.",
      });
    }

    await repository.deleteOne();

    res.status(200).json({
      success: true,
      message: "Repository deleted successfully.",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//only for clone purpose
const getPublicRepository = async (req, res) => {
  try {
    const { username, slug } = req.params;

    // Find the owner
    const owner = await User.findOne({
      username: username.toLowerCase(),
    });

    if (!owner) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    // Find repository
    const repository = await Repository.findOne({
      owner: owner._id,
      slug,
    }).populate("owner", "username");

    if (!repository) {
      return res.status(404).json({
        success: false,
        message: "Repository not found.",
      });
    }

    if (repository.visibility === "private") {
      return res.status(403).json({
        success: false,
        message: "Repository is private.",
      });
    }

    res.status(200).json({
      success: true,
      data: repository,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createRepository,
  getRepositories,
  getRepository,
  updateRepository,
  deleteRepository,
  getPublicRepository,
};
