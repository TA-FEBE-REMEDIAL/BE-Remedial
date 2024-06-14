const express = require("express");
const routes = express();

const {
  getKomentar,
  addKomentar,
} = require("../controller/KomentarController.js");

routes.get("/komentar", getKomentar);
routes.post("/komentar", addKomentar);

module.exports = routes;
