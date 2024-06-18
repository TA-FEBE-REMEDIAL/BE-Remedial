const Karya = require("../models/KaryaModel.js");
const path = require("path");
const fs = require("fs");

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
        "nilai",
        "feedback",
        "challenge_id",
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

const addKarya = async (req, res) => {
  const {
    kategori,
    judul,
    author,
    tanggal_penerbit,
    image_url,
    deskripsi,
    nilai,
    feedback,
    challenge_id,
  } = req.body;

  if (judul === undefined || judul === "") {
    return res.status(400).json({
      success: false,
      message: "Judul wajib di isi!",
    });
  }
  if (kategori === undefined || kategori === "") {
    return res.status(400).json({
      success: false,
      message: "Kategori wajib di isi!",
    });
  }
  if (author === undefined || author === "") {
    return res.status(400).json({
      success: false,
      message: "Author wajib di isi!",
    });
  }
  if (tanggal_penerbit === undefined || tanggal_penerbit === "") {
    return res.status(400).json({
      success: false,
      message: "Tgl Penerbit wajib di isi!",
    });
  }
  if (deskripsi === undefined || deskripsi === "") {
    return res.status(400).json({
      success: false,
      message: "Deskripsi wajib di isi!",
    });
  }

  if (req.files === null) {
    try {
      const data = await Karya.create({
        kategori: kategori,
        judul: judul,
        kategori: kategori,
        author: author,
        tanggal_penerbit: tanggal_penerbit,
        image_url: image_url,
        deskripsi: deskripsi,
        nilai: nilai,
        feedback: feedback,
        challenge_id: challenge_id,
      });

      return res.status(200).json({
        success: true,
        message: "Data Karya berhasil ditambahkan!",
        data: { ...req.body },
      });
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: "Data Karya Gagal ditambahkan",
      });
    }
  } else {
    const file = req.files.image_url;
    const fileSize = file.data.length;
    const ext = path.extname(file.name);
    const fileName = Date.now() + "_" + file.md5 + ext;
    const url = `${req.protocol}://${req.get("host")}/images/${fileName}`;
    const allowedType = [".png", ".jpg", ".jpeg"];

    if (!allowedType.includes(ext.toLowerCase())) {
      return res.status(422).json({
        success: false,
        message: "Format invalid, hanya bisa .png, .jpg dan .jpeg !",
      });
    }

    if (fileSize > 5000000) {
      return res.status(422).json({
        success: false,
        message: "Size file terlalu besar, maksimal 5MB !",
      });
    }

    const {
      kategori,
      judul,
      author,
      tanggal_penerbit,
      image_url = url,
      deskripsi,
      nilai,
      feedback,
      challenge_id,
    } = req.body;

    file.mv(`./public/images/${fileName}`, async (err) => {
      if (err) {
        return res.status(500).json({
          success: false,
          message: err.message,
        });
      }

      try {
        const data = await Karya.create({
          kategori: kategori,
          judul: judul,
          kategori: kategori,
          author: author,
          tanggal_penerbit: tanggal_penerbit,
          image_url: image_url,
          deskripsi: deskripsi,
          nilai: nilai,
          feedback: feedback,
          challenge_id: challenge_id,
        });

        return res.status(200).json({
          success: true,
          message: "Data Karya berhasil ditambahkan!",
          data: { ...req.body },
        });
      } catch (error) {
        console.error(error.message);
        return res.status(400).json({
          success: false,
          message: "Data Karya Gagal ditambahkan",
        });
      }
    });
  }
};

const editKarya = async (req, res) => {
  const { id } = req.params;

  const karya = await Karya.findOne({
    where: {
      id: id,
    },
  });
  if (!karya) return res.status(404).json({ message: "No data found" });

  let fileName = "";
  console.log(karya.dataValues.image_url);
  if (req.files === null) {
    fileName = karya.dataValues.image_url;
  } else {
    const file = req.files.image_url;
    const fileSize = file.data.length;
    const ext = path.extname(file.name);
    fileName = Date.now() + "_" + file.md5 + ext;
    const allowedType = [".png", ".jpeg", ".jpg"];

    if (!allowedType.includes(ext.toLowerCase())) {
      return res.status(422).json({
        success: false,
        message: "Format invalid, hanya bisa .png, .jpg dan .jpeg !",
      });
    }

    if (fileSize > 5000000) {
      return res.status(422).json({
        success: false,
        message: "Size file terlalu besar, maksimal 5MB !",
      });
    }

    const theImg = karya.dataValues.image_url;
    const split = theImg.split("images/")[1];
    const filePath = `./public/images/${split}`;
    const cek = fs.readdirSync("./public/images/");
    if (split !== undefined && cek.includes(split)) {
      fs.unlinkSync(filePath);
    }

    file.mv(`./public/images/${fileName}`, (err) => {
      if (err) {
        return res.status(500).json({ success: false, message: err.message });
      }
    });
  }

  const url = `${req.protocol}://${req.get("host")}/images/${fileName}`;

  try {
    const {
      kategori,
      judul,
      author,
      tanggal_penerbit,
      image_url = url,
      deskripsi,
      nilai,
      feedback,
      challenge_id,
    } = req.body;

    const data = await Karya.update(
      {
        kategori: kategori,
        judul: judul,
        kategori: kategori,
        author: author,
        tanggal_penerbit: tanggal_penerbit,
        image_url: image_url,
        deskripsi: deskripsi,
        nilai: nilai,
        feedback: feedback,
        challenge_id: challenge_id,
      },
      {
        where: {
          id: id,
        },
      }
    );

    return res.status(200).json({
      success: true,
      message: "Data Karya berhasil diupdate!",
      data: { id, ...req.body },
    });
  } catch (error) {
    console.error(err.message);
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

module.exports = { getKarya, addKarya, editKarya, findKaryaById };
