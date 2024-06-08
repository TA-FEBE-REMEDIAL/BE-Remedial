const Artikel = require("../models/AtikelModel.js");

const getArtikel = async (req, res) => {
  try {
    const artikel = await Artikel.findAll({
      attributes: [
        "id",
        "title",
        "kategori",
        "author",
        "date",
        "image_url",
        "artikel_web",
        "pengertian",
        "subbab1",
        "subbab2",
        "artikel1",
        "artikel2",
      ],
    });
    res.json(artikel);
  } catch (error) {
    console.log(error);
  }
};

const addArtikel = async (req, res) => {
  try {
    const {
      title,
      kategori,
      author,
      date,
      image_url,
      artikel_web,
      pengertian,
      subbab1,
      subbab2,
      artikel1,
      artikel2,
    } = req.body;
    await Artikel.create({
      title: title,
      kategori: kategori,
      author: author,
      date: date,
      image_url: image_url,
      artikel_web: artikel_web,
      pengertian: pengertian,
      subbab1: subbab1,
      subbab2: subbab2,
      artikel1: artikel1,
      artikel2: artikel2,
    });

    return res.status(200).json({
      success: true,
      msg: "Tambah data berhasil",
      data: { ...req.body },
    });
  } catch (error) {
    return res.status(200).json({
      success: false,
      message: `Data Gagal ditambahkan : ${error.message}`,
    });
  }
};

module.exports = { getArtikel, addArtikel };
