const express = require("express");
const routes = express();
const {
  getArtikel,
  findArtikelById,
} = require("../controller/ArtikelController.js");

routes.get("/artikel", getArtikel);
routes.get("/artikel/:id", findArtikelById);

module.exports = routes;
