const express = require("express");
const routes = express();
const {
  getKelas,
  findKelasById,
  addKelas,
} = require("../controller/KelasController.js");

routes.get("/kelas", getKelas);
routes.get("/kelas/:id", findKelasById);
routes.post("/kelas", addKelas);

module.exports = routes;
