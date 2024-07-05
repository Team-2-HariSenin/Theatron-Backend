const multer = require("multer");
const path = require("path");
const fs = require("fs");
const cloudinary = require("../config/cloudinary");
const { log } = require("console");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = path.join(__dirname, "../uploads/image/");
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    const filename = `${file.fieldname}${Date.now()}${path.extname(
      file.originalname
    )}`;
    cb(null, filename);
  },
});

function checkFileType(file, cb) {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Invalid file type. Only images are allowed."), false);
  }
}

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 10, // 10MB
  },
  fileFilter: (req, file, cb) => {
    checkFileType(file, cb);
  },
}).fields([
  { name: "image", maxCount: 1 },
  { name: "poster", maxCount: 1 },
]);

module.exports = (req, res, next) => {
  upload(req, res, async (err) => {
    if (err) {
      console.error("Error uploading files:", err);
      return res.status(500).json({
        success: false,
        message: err.message,
      });
    }

    const image = req.files["image"] ? req.files["image"][0] : null;
    const poster = req.files["poster"] ? req.files["poster"][0] : null;

    if (!image || !poster) {
      return res.status(400).json({ message: "Files are missing." });
    }

    const filePath = path.join(__dirname, "../uploads/image/");
    try {
      const url_image = await cloudinary.uploader.upload(
        filePath + image.filename,
        { folder: "Image", use_filename: true, unique_filename: false }
      );

      const url_poster = await cloudinary.uploader.upload(
        filePath + poster.filename,
        { folder: "Poster", use_filename: true, unique_filename: false }
      );

      req.body = {
        ...req.body,
        url_image: url_image.secure_url,
        url_poster: url_poster.secure_url,
      };
      next();
    } catch (err) {
      console.error("Error uploading to Cloudinary:", err);
      res.status(500).json({
        success: false,
        message: "Error uploading to Cloudinary",
        error: err.message, // Include the error message in the response
      });
    } finally {
      try {
        fs.unlinkSync(filePath + image.filename);
        fs.unlinkSync(filePath + poster.filename);
      } catch (err) {
        console.error("Error deleting local files:", err);
      }
    }
  });
};
