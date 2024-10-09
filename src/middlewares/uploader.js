const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');
const sharp = require('sharp');
const streamifier = require('streamifier');

// Cấu hình Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET
});

// Middleware Multer để lưu tệp vào bộ nhớ
const storage = multer.memoryStorage();
const uploadLocal = multer({ storage });

// Middleware để nén ảnh trước khi tải lên Cloudinary
const compressImage = async (req, res, next) => {
  if (!req.file) {
    return next();
  }

  try {
    const buffer = await sharp(req.file.buffer)
      .resize(800) // Thay đổi kích thước ảnh (nếu cần)
      .jpeg({ quality: 60 }) // Nén ảnh với chất lượng 60%
      .toBuffer();

    req.file.buffer = buffer;
    next();
  } catch (err) {
    return next(err);
  }
};

// Middleware để tải ảnh lên Cloudinary
const uploadToCloudinary = async (req, res, next) => {
  if (!req.file) {
    return next();
  }

  try {
    const result = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        { folder: 'learn_nodejs' },
        (error, result) => {
          if (error) {
            return reject(error);
          }
          resolve(result);
        }
      );

      streamifier.createReadStream(req.file.buffer).pipe(uploadStream);
    });

    req.file.cloudinaryUrl = result.secure_url;
    req.file.format = result.format;
    req.file.width = result.width;
    req.file.height = result.height;
    req.file.bytes = result.bytes;
    req.file.public_id = result.public_id;
    next();
  } catch (error) {
    return next(error);
  }
};

module.exports = { uploadLocal, compressImage, uploadToCloudinary };
