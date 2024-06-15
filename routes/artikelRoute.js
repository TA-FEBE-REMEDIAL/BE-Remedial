const express = require("express");
const routes = express();
const {
  getArtikel,
  findArtikelById,
  addArtikel,
} = require("../controller/ArtikelController.js");

routes.get("/artikel", getArtikel);
routes.get("/artikel/:id", findArtikelById);
routes.post("/artikel", addArtikel);

module.exports = routes;
