const express = require("express");
const routes = express();
const {
  getArtikel,
  addArtikel,
} = require("../controller/ArtikelController.js");

routes.get("/artikel", getArtikel);
routes.post("/artikel", addArtikel);

module.exports = routes;
