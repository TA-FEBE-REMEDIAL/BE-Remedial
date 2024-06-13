const { Sequelize } = require("sequelize");
const db = require("../config/database.js");

const { DataTypes } = Sequelize;

const Kelas = db.define(
  "kelas",
  {
    judul_kelas: {
      type: DataTypes.STRING,
    },
    desc_kelas: {
      type: DataTypes.STRING,
    },
    kategori: {
      type: DataTypes.STRING,
    },
    isi_materi: {
      type: DataTypes.STRING,
    },
    image_url: {
      type: DataTypes.STRING,
    },
    video_url: {
      type: DataTypes.STRING,
    },
  },
  {
    freezeTableName: true,
  }
);

module.exports = Kelas;
