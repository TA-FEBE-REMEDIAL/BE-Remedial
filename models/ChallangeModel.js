const { Sequelize } = require("sequelize");
const db = require("../config/database.js");

const { DataTypes } = Sequelize;

const Challenge = db.define(
  "challenge",
  {
    title: {
      type: DataTypes.STRING,
    },
    deskripsi: {
      type: DataTypes.STRING,
    },
    kuota: {
      type: DataTypes.INT,
    },
    mentor: {
      type: DataTypes.STRING,
    },
    detail_challenge_1: {
      type: DataTypes.STRING,
    },
    detail_challenge_2: {
      type: DataTypes.STRING,
    },
  },
  {
    timestamps: false,
    freezeTableName: true,
    createdAt: false,
    updatedAt: false,
  }
);

module.exports = Challenge;
