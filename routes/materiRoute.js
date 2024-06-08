const express = require("express");
const routes = express();
const {
  getMateri,
  addMateri,
} = require("../controller/MateriPembelajaranController.js");

routes.get("/materi", getMateri);
routes.post("/materi", addMateri);

module.exports = routes;
