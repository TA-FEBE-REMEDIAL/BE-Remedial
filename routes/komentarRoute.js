const express = require("express");
const routes = express();

const {
  getKomentar,
  addKomentar,
  findKomentarByArtikel,
} = require("../controller/KomentarController.js");

routes.get("/komentar", getKomentar);
routes.post("/komentar/:id", addKomentar);
routes.get("/komentar/:id", findKomentarByArtikel);

module.exports = routes;
