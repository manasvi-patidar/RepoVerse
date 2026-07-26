#!/usr/bin/env node
//above syntax allows the file to be executed directly as a CLI program

const { Command } = require("commander");

const init = require("./commands/init.js");
const add = require("./commands/add.js");
const commit = require("./commands/commit.js");
const push = require("./commands/push.js");
const login = require("./commands/login.js");
const pull = require("./commands/pull.js");
const revert = require("./commands/revert.js");
const log = require("./commands/log.js");
const clone = require("./commands/clone.js");

const program = new Command();

program.name("repoverse").description("RepoVerse CLI").version("1.0.0");

//init
program
  .command("init")
  .description("Initialize a RepoVerse repository")
  .action(init);

//add
program.command("add <path>").description("Stage files").action(add);

//commit
program
  .command("commit")
  .description("Create a new commit")
  .requiredOption("-m, --message <message>", "Commit message") //Commander method that makes -m mandatory
  .action(commit);

//push
program.command("push").description("Push commits to remote").action(push);

//login
program.command("login").description("Login to RepoVerse").action(login);

//pull
program
  .command("pull")
  .description("Pull latest commit from repository")
  .action(pull);

//revert
program
  .command("revert <commitId>")
  .description("Revert repository to a previous commit")
  .action(revert);

//log
program.command("log").description("Show commit history").action(log);

//clone
program
  .command("clone <repository>")
  .description("Clone a public repository")
  .action(clone);

program.parse();
