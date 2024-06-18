const Challenge = require("../models/ChallangeModel.js");
const Program = require("../models/ProgramModel.js");

const getChallenge = async (req, res) => {
  try {
    const challenge = await Challenge.findAll({
      attributes: [
        "id",
        "title",
        "deskripsi",
        "img_url",
        "kuota",
        "mentor",
        "detail_challenge_1",
        "detail_challenge_2",
        "program_id",
      ],
    });
    res.json(challenge);
  } catch (error) {
    console.log(error);
  }
};

const findChallengeById = async (req, res) => {
  try {
    const challenge = await Challenge.findOne({
      where: {
        id: req.params.id,
      },
    });

    res.json(challenge);
  } catch (error) {
    console.log(error);
  }
};

const findChallengeByProgramId = async (req, res) => {
  try {
    const challenge = await Challenge.findAll({
      where: {
        program_id: req.params.program_id,
      },
      include: [
        {
          model: Program,
          as: "program",
          attributes: ["id", "judul", "image"],
        },
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

module.exports = {
  getChallenge,
  findChallengeByProgramId,
  findChallengeById,
  addChallenge,
};
