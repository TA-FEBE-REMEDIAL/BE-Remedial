const Challenge = require("../models/ChallangeModel.js");

const getChallenge = async (req, res) => {
  try {
    const challenge = await Challenge.findAll({
      attributes: [
        "id",
        "title",
        "deskripsi",
        "kuota",
        "mentor",
        "detail_challenge_1",
        "detail_challenge_2",
      ],
    });
    res.json(challenge);
  } catch (error) {
    console.log(error);
  }
};

const addChallenge = async (req, res) => {
  try {
    const {
      title,
      deskripsi,
      kuota,
      mentor,
      detail_challenge_1,
      detail_challenge_2,
    } = req.body;

    await Challenge.create({
      title: title,
      deskripsi: deskripsi,
      kuota: kuota,
      mentor: mentor,
      detail_challenge_1: detail_challenge_1,
      detail_challenge_2: detail_challenge_2,
    });
    return res.status(200).json({
      success: true,
      msg: "Tambah data berhasil",
      data: { ...req.body },
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      msg: `Data gagal ditambahkan : ${error.msg}`,
    });
  }
};

module.exports = { getChallenge, addChallenge };
