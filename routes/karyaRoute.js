const express = require("express");
const routes = express();
const {
  getKarya,
  addKarya,
  getKaryaById,
} = require("../controller/KaryaController.js");

routes.get("/karya", getKarya);
routes.get("/karya/:id", getKaryaById);
routes.post("/karya", addKarya);
// routes.delete("/karya/:id", deleteKarya);

module.exports = routes;
