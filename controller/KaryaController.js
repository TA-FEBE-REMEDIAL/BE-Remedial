const Karya = require("../models/KaryaModel.js");

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

const addKarya = async (req, res) => {
  try {
    const { kategori, judul, author, tanggal_penerbit, image_url, deskripsi } =
      req.body;

    if (
      kategori === undefined ||
      kategori === "" ||
      judul === undefined ||
      judul === "" ||
      author === undefined ||
      author === "" ||
      tanggal_penerbit === undefined ||
      tanggal_penerbit === "" ||
      deskripsi === undefined ||
      deskripsi === ""
    ) {
      return res.status(400).json({
        success: false,
        message: "Data Wajib di isi!",
      });
    }
    await Karya.create({
      kategori: kategori,
      judul: judul,
      author: author,
      tanggal_penerbit: tanggal_penerbit,
      image_url: image_url,
      deskripsi: deskripsi,
    });

    return res.status(200).json({
      success: true,
      msg: "Tambah data berhasi;",
      data: { ...req.body },
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: `Data Gagal ditambahkan : ${error.message}`,
    });
  }
};

module.exports = { getKarya, addKarya };
