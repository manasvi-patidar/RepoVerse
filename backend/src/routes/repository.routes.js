const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/auth.middleware.js");

const {
  createRepository,
  getRepositories,
  getRepository,
  updateRepository,
  deleteRepository,
  getPublicRepository,
} = require("../controllers/repository.controller.js");

// Clone
router.get("/clone/:username/:slug", getPublicRepository);

// Everything below requires authentication
router.use(authMiddleware);

router.route("/").post(createRepository).get(getRepositories);

// Repository by ID
router
  .route("/:id")
  .get(getRepository)
  .put(updateRepository)
  .delete(deleteRepository);

module.exports = router;
