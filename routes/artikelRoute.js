const express = require("express");
const routes = express();
const {
  getArtikel,
  findArtikelById,
  findArtikelByKategori,
} = require("../controller/ArtikelController.js");

routes.get("/artikel", getArtikel);
routes.get("/artikel/:id", findArtikelById);
routes.get("/artikel/filter/:kategori", findArtikelByKategori);

module.exports = routes;
