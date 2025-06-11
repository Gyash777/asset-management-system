const multer = require('multer');
const path = require('path');

const limits = { fileSize: 10 * 1024 * 1024 }; // 10MB

function fileFilter(req, file, cb) {
  const ext = path.extname(file.originalname).toLowerCase();
  if (file.fieldname === 'images') {
    return /\.jpg|jpeg|png$/.test(ext) ? cb(null, true) : cb(new Error('Only JPG/PNG images'), false);
  }
  return /\.pdf|docx$/.test(ext) ? cb(null, true) : cb(new Error('Only PDF/DOCX files'), false);
}

const storage = multer.diskStorage({
  destination: (req, file, cb) =>
    cb(null, file.fieldname === 'images' ? 'uploads/images' : 'uploads/files'),
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`)
});

module.exports = multer({ storage, fileFilter, limits });
