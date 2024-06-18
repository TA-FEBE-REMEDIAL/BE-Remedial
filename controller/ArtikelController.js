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
        "isi_artikel",
      ],
    });

    const artikelLimit = await Artikel.findAll({
      order: [["id", "DESC"]],
      limit: 2,
    });

    return res.status(200).json({
      success: true,
      message: "Menampilkan data seluruh artikel",
      data: artikel,
      limit: artikelLimit,
    });

    // res.json(artikel);
  } catch (error) {
    console.log(error);
  }
};

const findArtikelById = async (req, res) => {
  try {
    const artikel = await Artikel.findOne({
      where: {
        id: req.params.id,
      },
    });
    const kategori = artikel.dataValues.kategori;
    const rekomendasi = await Artikel.findAll({
      where: {
        kategori: kategori,
      },
      // order: [["date", "DESC"]],
      limit: 4,
    });

    return res.status(200).json({
      success: true,
      message: "Menampilkan data seluruh artikel",
      data: artikel,
      rekomendasi: rekomendasi,
    });
  } catch (error) {
    console.log(error);
  }
};

const addArtikel = async (req, res) => {
  try {
    const { title, kategori, author, date, image_url, isi_artikel } = req.body;
    await Artikel.create({
      title: title,
      kategori: kategori,
      author: author,
      date: date,
      image_url: image_url,
      isi_artikel: isi_artikel,
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

module.exports = { getArtikel, findArtikelById, addArtikel };
