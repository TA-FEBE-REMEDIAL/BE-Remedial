const Karya = require("../models/KaryaModel.js");
const path = require("path");

const getKarya = async (req, res) => {
  try {
    const karya = await Karya.findAll({
      attributes: [
        "id",
        "kategori",
        "judul",
        "author",
        "tanggal_penerbit",
        "image_url",
        "deskripsi",
      ],
    });
    res.json(karya);
  } catch (error) {
    console.log(error);
  }
};

module.exports = { getKarya };
