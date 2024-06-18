const express = require("express");
const routes = express();
const { getKarya, findKaryaById } = require("../controller/KaryaController.js");

routes.get("/karya", getKarya);
routes.get("/karya/:id", findKaryaById);

// routes.delete("/karya/:id", deleteKarya);

module.exports = routes;
