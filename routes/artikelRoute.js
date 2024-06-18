const express = require("express");
const routes = express();
const { getArtikel } = require("../controller/ArtikelController.js");

routes.get("/artikel", getArtikel);

module.exports = routes;
