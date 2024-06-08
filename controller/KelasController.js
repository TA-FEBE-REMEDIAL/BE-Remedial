const Kelas = require("../models/KelasModel.js");

const getKelas = async (req, res) => {
  try {
    const kelas = await Kelas.findAll({
      attributes: ["id", "kategori", "isi_materi", "image_url"],
    });
    res.json(kelas);
  } catch (error) {
    console.log(error);
  }
};

const addKelas = async (req, res) => {
  try {
    const { kategori, isi_materi, image_url } = req.body;

    await Kelas.create({
      kategori: kategori,
      isi_materi: isi_materi,
      image_url: image_url,
    });

    return res.status(200).json({
      success: true,
      msg: "Tambah data berhasil",
      data: { ...req.body },
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: `Data Gagal ditambahkan : ${error.message}`,
    });
  }
};

module.exports = { getKelas, addKelas };
