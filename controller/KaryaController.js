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

const addKarya = async (req, res) => {
  if (req.files === null)
    return res.status(400).json({ msg: "No File Uploaded" });
  const name = req.body.title;
  const file = req.files.file;
  const fileSize = file.data.length;
  const ext = path.extname(file.name);
  const fileName = file.md5 + ext;
  const url = `${req.protocol}://${req.get("host")}/images/${fileName}`;
  const allowedType = [".png", ".jpg", ".jpeg"];

  if (!allowedType.includes(ext.toLowerCase()))
    return res.status(422).json({
      msg: "Invalid Images",
    });
  if (fileSize > 5000000)
    return res.status(422).json({
      msg: "Images must be less than 5 mb",
    });

  file.mv(`./public/images/${fileName}`, async (err) => {
    if (err) return res.status(500).json({ msg: err.message });
    try {
      await Karya.create({
        judul: name,
        image_url: fileName,
        url: url,
      });
      res.status(201).json({ msg: "Karya Created Successfully" });
    } catch (error) {
      console.log(error.message);
    }
  });
};

const getKaryaById = async (req, res) => {
  try {
    const response = await Karya.findOne({
      where: {
        id: req.params.id,
      },
    });
    res.json(response);
  } catch (error) {
    console.log(error.message);
  }
};

const updateKarya = async (req, res) => {};

const deleteKarya = async (req, res) => {};

module.exports = { getKarya, addKarya, getKaryaById };
