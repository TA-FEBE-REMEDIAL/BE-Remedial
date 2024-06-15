const { Sequelize } = require("sequelize");
const db = require("../config/database.js");
const Program = require("./ProgramModel.js");

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
    img_url: {
      type: DataTypes.STRING,
    },
    kuota: {
      type: DataTypes.BIGINT,
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
    program_id: {
      type: DataTypes.BIGINT,
    },
  },
  {
    timestamps: false,
    freezeTableName: true,
    createdAt: false,
    updatedAt: false,
  }
);

Challenge.belongsTo(Program, {
  foreignKey: "program_id",
  as: "program",
});

module.exports = Challenge;
