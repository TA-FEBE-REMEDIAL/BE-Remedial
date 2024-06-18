const express = require("express");
const routes = express();
const {
  getProgram,
  findProgramById,
  addProgram,
} = require("../controller/ProgramController.js");

routes.get("/program", getProgram);
routes.get("/program/:id", findProgramById);
routes.post("/program", addProgram);

module.exports = routes;
