const express = require("express");
const routes = express();
const {
  getKarya,
  addKarya,
  editKarya,
} = require("../controller/KaryaController.js");

routes.get("/karya", getKarya);
routes.post("/karya", addKarya);
routes.put("/karya/:id", editKarya);

module.exports = routes;
