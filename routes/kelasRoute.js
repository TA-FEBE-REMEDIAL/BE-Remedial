const express = require("express");
const routes = express();
const { getKelas, addKelas } = require("../controller/KelasController.js");

routes.get("/kelas", getKelas);
routes.post("/kelas", addKelas);

module.exports = routes;
