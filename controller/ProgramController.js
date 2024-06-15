const Program = require("../models/ProgramModel.js");

const getProgram = async (req, res) => {
  try {
    const program = await Program.findAll({
      attributes: [
        "id",
        "judul",
        "kategori",
        "image",
        "desc_program",
        "detail_program",
      ],
    });
    res.json(program);
  } catch (error) {
    console.log(error);
  }
};

const findProgramById = async (req, res) => {
  try {
    const program = await Program.findOne({
      where: {
        id: req.params.id,
      },
    });

    res.json(program);
  } catch (error) {
    console.log(error);
  }
};

const addProgram = async (req, res) => {
  try {
    const { judul, kategori, desc_program, detail_program } = req.body;

    await Program.create({
      judul: judul,
      kategori: kategori,
      desc_program: desc_program,
      detail_program: detail_program,
    });

    return res.status(200).json({
      success: true,
      msg: "Tambah data berhasil",
      data: { ...req.body },
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      msg: `Data Gagal ditambahkan : ${error.msg}`,
    });
  }
};

module.exports = { getProgram, findProgramById, addProgram };
