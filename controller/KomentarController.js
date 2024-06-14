const Komentar = require("../models/KomentarModel.js");

const getKomentar = async (req, res) => {
  try {
    const komentar = await Komentar.findAll({
      attributes: [
        "id",
        "nama",
        "email",
        "komentar",
        "date",
        "isi_artikel",
        "artikel_id",
      ],
    });
    res.json(komentar);
  } catch (error) {
    console.log(error);
  }
};

const addKomentar = async (req, res) => {
  try {
    const { nama, email, komentar, date, isi_artikel, artikel_id } = req.bodyl;

    await Komentar.create({
      nama: nama,
      email: email,
      komentar: komentar,
      date: date,
      isi_artikel: isi_artikel,
      artikel_id: artikel_id,
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

module.exports = { getKomentar, addKomentar };
