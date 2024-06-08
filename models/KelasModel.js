const { Sequelize } = require("sequelize");
const db = require("../config/database.js");

const { DataTypes } = Sequelize;

const Kelas = db.define(
  "kelas",
  {
    kategori: {
      type: DataTypes.STRING,
    },
    isi_materi: {
      type: DataTypes.STRING,
    },
    image_url: {
      type: DataTypes.STRING,
    },
  },
  {
    freezeTableName: true,
  }
);

module.exports = Kelas;
