const Kelas = require("../models/KelasModel.js");
const Sequelize = require("sequelize");

const getKelas = async (req, res) => {
  try {
    const kelas = await Kelas.findAll({
      attributes: [
        "id",
        "judul_kelas",
        "desc_kelas",
        "kategori",
        "isi_materi",
        "image_url",
        "video_url",
      ],
    });

    const kelasLimit = await Kelas.findAll({
      order: Sequelize.literal("RAND()"),
      limit: 3,
    });

    return res.status(200).json({
      success: true,
      message: "Menampilkan data seluruh kelas",
      data: kelas,
      limit: kelasLimit,
    });

    // return res.json({ kelas, kelasLimit });
  } catch (error) {
    console.log(error);
  }
};

const findKelasById = async (req, res) => {
  try {
    const kelas = await Kelas.findOne({
      where: {
        id: req.params.id,
      },
    });

    const kategori = kelas.dataValues.kategori;
    const rekomendasi = await Kelas.findAll({
      where: {
        kategori: kategori,
      },
      // order: [["date", "DESC"]],
      limit: 3,
    });
    return res.status(200).json({
      success: true,
      message: "Menampilkan data seluruh kelas",
      data: kelas,
      rekomendasi: rekomendasi,
    });
  } catch (error) {
    console.log(error);
  }
};

const addKelas = async (req, res) => {
  try {
    const {
      judul_kelas,
      desc_kelas,
      kategori,
      isi_materi,
      image_url,
      video_url,
    } = req.body;

    const data = await Kelas.create({
      judul_kelas: judul_kelas,
      desc_kelas: desc_kelas,
      kategori: kategori,
      isi_materi: isi_materi,
      image_url: image_url,
      video_url: video_url,
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

module.exports = { getKelas, findKelasById, addKelas };
