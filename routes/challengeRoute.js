const express = require("express");
const routes = express();

const {
  getChallenge,
  findChallengeByProgramId,
  findChallengeById,
  addChallenge,
} = require("../controller/ChallengeController.js");

routes.get("/challenge", getChallenge);
routes.get("/challenge/find/:id", findChallengeById);
routes.get("/challenge/:program_id", findChallengeByProgramId);
routes.post("/challenge", addChallenge);

module.exports = routes;
