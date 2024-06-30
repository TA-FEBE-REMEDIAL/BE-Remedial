const multer = require("multer");
const path = require("path");
const crypto = require("crypto");

function hashMD5(text) {
  return crypto.createHash("md5").update(text).digest("hex");
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    let uploadPath;
    if (file.fieldname === "image_url") {
      uploadPath = path.join(__dirname, "../public/images");
    } else if (file.fieldname === "lampiran") {
      uploadPath = path.join(__dirname, "../public/lampiran");
    }
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, req.body.author + "-" + hashMD5(file.originalname) + ext);
  },
});

const upload = multer({ storage: storage }).fields([
  { name: "image_url", maxCount: 1 },
  { name: "lampiran", maxCount: 5 },
]);

const uploadOnlyData = multer({ storage: storage });

module.exports = { upload, uploadOnlyData };
