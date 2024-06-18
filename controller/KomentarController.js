const Komentar = require("../models/KomentarModel.js");

const getKomentar = async (req, res) => {
  try {
    const komentar = await Komentar.findAll({
      attributes: ["id", "nama", "email", "komentar", "date", "artikel_id"],
    });
    res.json(komentar);
  } catch (error) {
    console.log(error);
  }
};

const addKomentar = async (req, res) => {
  try {
    const { id } = req.params;
    const tgl = new Date();
    // const formattedDate = tgl.toISOString().split("T")[0];
    const { nama, email, komentar, date = tgl, artikel_id = id } = req.body;

    const response = await Komentar.create({
      nama: nama,
      email: email,
      komentar: komentar,
      date: date,
      artikel_id: artikel_id,
    });
    console.log(response);

    return res.status(200).json({
      success: true,
      msg: "Tambah data berhasil",
      data: { ...req.body },
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      success: false,
      msg: `Data gagal ditambahkan : ${error.msg}`,
    });
  }
};

const findKomentarByArtikel = async (req, res) => {
  try {
    const komentar = await Komentar.findAll({
      where: {
        artikel_id: req.params.id,
      },
      order: [["date", "DESC"]],
    });

    res.json(komentar);
  } catch (error) {
    console.log(error);
  }
};

module.exports = { getKomentar, addKomentar, findKomentarByArtikel };
