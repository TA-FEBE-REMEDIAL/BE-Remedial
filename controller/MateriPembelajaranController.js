const Materi = require("../models/materiPembelajaranModel.js");

const getMateri = async (req, res) => {
  try {
    const materi = await Materi.findAll({
      attributes: [
        "id",
        "judul",
        "kategori",
        "deskripsi_materi",
        "image_url",
        "kelas_rekomendasi",
        "kelas_id",
      ],
    });
    res.json(materi);
  } catch (error) {
    console.log(error);
  }
};

const addMateri = async (req, res) => {
  try {
    const {
      judul,
      kategori,
      deskripsi_materi,
      image_url,
      kelas_rekomendasi,
      kelas_id,
    } = req.body;

    await Materi.create({
      judul: judul,
      kategori: kategori,
      deskripsi_materi: deskripsi_materi,
      image_url: image_url,
      kelas_rekomendasi: kelas_rekomendasi,
      kelas_id: kelas_id,
    });

    return res.status(200).json({
      succes: true,
      msg: "Tambah data berhasil",
      data: { ...req.body },
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      msg: `Data Gagal ditambahkan : ${error.message}`,
    });
  }
};

module.exports = { getMateri, addMateri };
