const express = require("express");
const routes = express();
const {
  getProgram,
  addProgram,
} = require("../controller/ProgramController.js");

routes.get("/program", getProgram);
routes.post("/program", addProgram);

module.exports = routes;
