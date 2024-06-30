const Karya = require("../models/KaryaModel.js");
const path = require("path");
const fs = require("fs");
const { upload } = require("../config/multerConfig.js");
const crypto = require("crypto");

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
        "email",
      ],
    });

    const karyaLimit = await Karya.findAll({
      // order: Sequelize.literal("RAND()"),
      limit: 3,
    });
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
  upload(req, res, async function (err) {
    if (err) {
      return res
        .status(400)
        .send({ message: "Error uploading files", error: err });
    }

    const {
      kategori,
      judul,
      author,
      tanggal_penerbit,
      image_url = req.files.image_url,
      deskripsi,
      nilai,
      feedback,
      challenge_id,
      email,
      lampiran = req.files.lampiran,
      link,
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
    if (image_url === undefined || image_url === "") {
      return res.status(400).json({
        success: false,
        message: "Gambar wajib di isi!",
      });
    }
    if (
      (lampiran === undefined || lampiran === "") &&
      (link === undefined || link === "")
    ) {
      return res.status(400).json({
        success: false,
        message: "Link atau lampiran wajib di isi!",
      });
    }

    function hashMD5(text) {
      return crypto.createHash("md5").update(text).digest("hex");
    }

    // console.log(!lampiran);
    let lampiranUrls;
    if (!lampiran) {
      lampiranUrls = [];
    } else {
      const fileLampiran = req.files.lampiran;
      const lampiranSize = fileLampiran.size;
      const extLampiran = fileLampiran.map((data) =>
        path.extname(data.originalname)
      );
      const lampiranName = fileLampiran.map(
        (data) => `${req.body.author}-${hashMD5(data.originalname)}`
      );
      lampiranUrls = fileLampiran.map(
        (data, index) =>
          `${req.protocol}://${req.get("host")}/lampiran/${
            lampiranName[index]
          }${extLampiran[index]}`
      );
      const allowedLampiran = [
        ".pdf",
        ".jpg",
        ".png",
        ".doc",
        ".docx",
        ".ppt",
        ".pptx",
        ".xls",
        ".xlsx",
        ".jpeg",
      ];

      const isValidLampiran = extLampiran.every((ext) =>
        allowedLampiran.includes(ext.toLowerCase())
      );

      if (!isValidLampiran) {
        return res.status(422).json({
          success: false,
          message: `Format invalid, file harus berupa ekstensi ${allowedLampiran.join(
            ", "
          )} !`,
        });
      }

      if (lampiranSize > 5000000) {
        return res.status(422).json({
          success: false,
          message: "Size file terlalu besar, maksimal 5MB !",
        });
      }
    }

    const file = req.files.image_url;
    const fileSize = file.size;
    const ext = path.extname(file[0].originalname);
    const fileName = req.body.author + "-" + hashMD5(file[0].originalname);
    const url = `${req.protocol}://${req.get("host")}/images/${fileName}${ext}`;
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

    try {
      const arrLink = link.split(",").map((item) => item.trim());

      const data = await Karya.create({
        kategori: kategori,
        judul: judul,
        kategori: kategori,
        author: author,
        tanggal_penerbit: tanggal_penerbit,
        image_url: url,
        deskripsi: deskripsi,
        nilai: nilai,
        feedback: feedback,
        challenge_id: challenge_id,
        email: email,
        lampiran: lampiranUrls,
        link: arrLink,
      });

      return res.status(200).json({
        success: true,
        message: "Data Karya berhasil ditambahkan!",
        data: { ...data.dataValues },
      });
    } catch (error) {
      console.error(error.message);
      return res.status(400).json({
        success: false,
        message: `Data Karya Gagal ditambahkan karena ${error.message}`,
      });
    }
  });
};

const editKarya = async (req, res) => {
  upload(req, res, async function (err) {
    if (err) {
      return res
        .status(400)
        .send({ message: "Error uploading files", error: err });
    }
    const { id } = req.params;

    const karya = await Karya.findOne({
      where: {
        id: id,
      },
    });
    if (!karya) return res.status(404).json({ message: "No data found" });

    let fileName = "";
    // let lampiranName;
    let ext;
    // let extLampiran;
    // let fileLampiran;
    if (Object.keys(req.files).length === 0) {
      fileName = karya.dataValues.image_url;
      // lampiranName = karya.dataValues.lampiran;
      // fileLampiran = karya.dataValues.lampiran;
    } else {
      function hashMD5(text) {
        return crypto.createHash("md5").update(text).digest("hex");
      }

      // fileLampiran = req.files.lampiran;
      // const lampiranSize = fileLampiran.size;
      // extLampiran = fileLampiran.map((data) => path.extname(data.originalname));
      // lampiranName = fileLampiran.map(
      //   (data) => `${req.body.author}-${hashMD5(data.originalname)}`
      // );
      // const lampiranUrls = fileLampiran.map(
      //   (data, index) =>
      //     `${req.protocol}://${req.get("host")}/lampiran/${
      //       lampiranName[index]
      //     }${extLampiran[index]}`
      // );
      // const allowedLampiran = [
      //   ".pdf",
      //   ".jpg",
      //   ".png",
      //   ".doc",
      //   ".docx",
      //   ".ppt",
      //   ".pptx",
      //   ".xls",
      //   ".xlsx",
      //   ".jpeg",
      // ];

      // const isValidLampiran = extLampiran.every((ext) =>
      //   allowedLampiran.includes(ext.toLowerCase())
      // );

      // if (!isValidLampiran) {
      //   return res.status(422).json({
      //     success: false,
      //     message: `Format invalid, file harus berupa ekstensi ${allowedLampiran.join(
      //       ", "
      //     )} !`,
      //   });
      // }

      const file = req.files.image_url;
      const fileSize = file.size;
      ext = path.extname(file[0].originalname);
      fileName = req.body.author + "-" + hashMD5(file[0].originalname);
      // const url = `${req.protocol}://${req.get(
      //   "host"
      // )}/images/${fileName}${ext}`;
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

      const theImg = karya.dataValues.image_url;
      const split = theImg.split("images/")[1];
      const filePath = `./public/images/${split}`;
      const cek = fs.readdirSync("./public/images/");
      // if (split !== undefined && cek.includes(split)) {
      //   fs.unlinkSync(filePath);
      // }

      // const theLampiran = karya.dataValues.lampiran;
      // const splitL = theLampiran.split("lampiran/")[1];
      // const filePathL = `./public/lampiran/${splitL}`;
      // const cekL = fs.readdirSync("./public/lampiran/");
      // if (splitL !== undefined && cekL.includes(splitL)) {
      //   fs.unlinkSync(filePathL);
      // }

      // file.mv(`./public/images/${fileName}`, (err) => {
      //   if (err) {
      //     return res.status(500).json({ success: false, message: err.message });
      //   }
      // });
    }
    try {
      const url = `${req.protocol}://${req.get(
        "host"
      )}/images/${fileName}${ext}`;

      // let fileLampiranJSON;
      // if (Array.isArray(fileLampiran)) {
      //   fileLampiranJSON = fileLampiran;
      // } else {
      //   fileLampiranJSON = JSON.parse(fileLampiran);
      // }
      // console.log(lampiranName);
      // const lampiranUrls = fileLampiranJSON.map((data, index) => {
      //   return `${req.protocol}://${req.get(
      //     "host"
      //   )}/lampiran/${lampiranName}${extLampiran}`;
      // });

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
        email,
        // lampiran = lampiranUrls,
        // link,
      } = req.body;

      // const arrLink = link.split(",").map((item) => item.trim());

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
          email: email,
          // lampiran: lampiran,
          // link: arrLink,
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
      console.error(error.message);
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  });
};

module.exports = { getKarya, addKarya, editKarya, findKaryaById };
