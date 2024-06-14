const express = require("express");
const routes = express();

const {
  getChallenge,
  addChallenge,
} = require("../controller/ChallengeController.js");

routes.get("/challenge", getChallenge);
routes.post("/challenge", addChallenge);

module.exports = routes;
