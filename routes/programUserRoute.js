const express = require("express");
const routes = express();

const {
  getProgramUser,
  addProgramUser,
} = require("../controller/ProgramUserController.js");

routes.get("/programuser", getProgramUser);
routes.post("/programuser", addProgramUser);

module.exports = routes;
