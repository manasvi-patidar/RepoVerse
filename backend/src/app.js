const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");

const app = express();
const authRoutes = require("./routes/auth.routes.js");
const repositoryRoutes = require("./routes/repository.routes.js");
const commitRoutes = require("./routes/commit.routes.js");
const issueRoutes = require("./routes/issue.routes.js");
const errorHandler = require("./middleware/error.middleware.js");

// Middlewares
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  }),
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan("dev"));

app.use("/api/auth", authRoutes);
app.use("/api/repositories", repositoryRoutes);
app.use("/api/commits", commitRoutes);
app.use("/api/issues", issueRoutes);

// Home Route
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Welcome to RepoVerse API 🚀",
  });
});

app.use(errorHandler);

module.exports = app;
