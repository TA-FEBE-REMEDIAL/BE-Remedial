const express = require("express");
const routes = express();
const {
  getKarya,
  addKarya,
  editKarya,
  findKaryaById,
} = require("../controller/KaryaController.js");

routes.get("/karya", getKarya);
routes.get("/karya/:id", findKaryaById);

// routes.delete("/karya/:id", deleteKarya);
routes.post("/karya", addKarya);
routes.put("/karya/:id", editKarya);

module.exports = routes;
