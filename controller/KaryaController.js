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

    const karyaLimit = await Karya.findAll({
      // order: Sequelize.literal("RAND()"),
      limit: 3,
    });
    console.log(karyaLimit);
    return res.status(200).json({
      success: true,
      message: "Menampilkan data seluruh karya",
      data: karya,
      limit: karyaLimit,
    });
  } catch (error) {
    console.log(error);
  }
};
const findKaryaById = async (req, res) => {
  try {
    const karya = await Karya.findOne({
      where: {
        id: req.params.id,
      },
    });

    return res.status(200).json({
      success: true,
      message: "Menampilkan data seluruh karya",
      data: karya,
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = { getKarya, findKaryaById };
