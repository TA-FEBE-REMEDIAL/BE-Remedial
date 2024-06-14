const ProgramUser = require("../models/ProgramUserModel.js");
const Users = require("../models/UserModel.js");
const Program = require("../models/ProgramModel.js");

const getProgramUser = async (req, res) => {
  try {
    const programuser = await ProgramUser.findAll({
      //   include: [
      //     {
      //       model: Users,
      //       attributes: [`id`, `name`, `email`, `password`, `role`],
      //     },
      //     {
      //       model: Program,
      //       attributes: [
      //         `id`,
      //         `judul`,
      //         `kategori`,
      //         `desc_program`,
      //         `detail_program`,
      //       ],
      //     },
      //   ],
      attributes: ["id", "users_id", "program_id"],
    });
    res.json(programuser);
  } catch (error) {
    console.log(error);
  }
};

const addProgramUser = async (req, res) => {
  try {
    const { users_id, program_id } = req.body;

    await ProgramUser.create({
      users_id: users_id,
      program_id: program_id,
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

module.exports = { getProgramUser, addProgramUser };
