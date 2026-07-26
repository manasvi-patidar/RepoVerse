const fs = require("fs");
const path = require("path");
const axios = require("axios");
const chalk = require("chalk");
const inquirer = require("inquirer");

const login = async () => {
  try {
    const root = process.cwd();

    const repoPath = path.join(root, ".repoverse");

    if (!fs.existsSync(repoPath)) {
      console.log(chalk.red("Initialize RepoVerse first."));
      return;
    }

    const answers = await inquirer.prompt([
      {
        type: "input",
        name: "email",
        message: "Email:",
      },
      {
        type: "password",
        name: "password",
        message: "Password:",
        mask: "*",
      },
    ]);

    const configPath = path.join(repoPath, "config.json");
    const config = JSON.parse(fs.readFileSync(configPath, "utf-8"));

    const response = await axios.post(`${config.backendUrl}/api/auth/login`, {
      email: answers.email,
      password: answers.password,
    });

    config.token = response.data.data.token;
    config.user = response.data.data.user;

    fs.writeFileSync(configPath, JSON.stringify(config, null, 4));

    console.log(chalk.green("\nLogin Successful."));
  } catch (error) {
    console.log(chalk.red(error.response?.data?.message || error.message));
  }
};

module.exports = login;
