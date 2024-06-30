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
    if (file.fieldname === "image") {
      const filename = `image${Date.now()}${path.extname(file.originalname)}`;
      cb(null, filename);
    } else if (file.fieldname === "poster") {
      const filename = `poster${Date.now()}${path.extname(file.originalname)}`;
      cb(null, filename);
    }
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
    // Ensure files exist before proceeding
    if (!image || !poster) {
      return res.status(400).json({ message: "Files are missing." });
    }

    const filePath = path.join(__dirname, "../uploads/image/");
    try {
      const url_image = await cloudinary.uploader.upload(
        filePath + image.filename,
        { folder: "Image", use_filename: true, unique_filename: false },
        function (err, result) {
          if (err) {
            console.log(err);
            return res.status(500).json({
              success: false,
              message: "Error",
            });
          }
        }
      );

      const url_poster = await cloudinary.uploader.upload(
        filePath + poster.filename,
        { folder: "Poster", use_filename: true, unique_filename: false },
        function (err, result) {
          if (err) {
            console.log(err);
            return res.status(500).json({
              success: false,
              message: "Error",
            });
          }
        }
      );
      req.body = JSON.parse(JSON.stringify(req.body));

      req.body = {
        ...req.body,
        url_image: url_image.secure_url,
        url_poster: url_poster.secure_url,
      };
    } catch (err) {
      console.error(err);
      res.status(500).json({
        success: false,
        message: "Error uploading to Cloudinary",
      });
    } finally {
      fs.unlinkSync(filePath + image.filename);
      fs.unlinkSync(filePath + poster.filename);
    }
    next();
  });
};
