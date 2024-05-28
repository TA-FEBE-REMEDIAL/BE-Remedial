const express = require("express");
const routes = express();
const { getKarya, addKarya } = require("../controller/KaryaController.js");

routes.get("/karya", getKarya);
routes.post("/karya", addKarya);

module.exports = routes;
