const express = require("express");
const routes = express();
const {
  getKarya,
  addKarya,
  editKarya,
  findKaryaById,
  deleteKarya,
} = require("../controller/KaryaController.js");

routes.get("/karya", getKarya);
routes.get("/karya/:id", findKaryaById);
routes.post("/karya", addKarya);
routes.put("/karya/:id", editKarya);
routes.delete("/karya/:id", deleteKarya);

module.exports = routes;
