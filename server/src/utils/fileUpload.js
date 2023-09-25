const fs = require('fs');
const path = require('path');
const multer = require('multer');
const env = process.env.NODE_ENV || 'development';
const devFilePath = path.resolve(__dirname, '..', '..', '..', 'public/images');

const filePath = env === 'production'
  ? '/var/www/html/images/'
  : devFilePath;

if (!fs.existsSync(filePath)) {
  fs.mkdirSync(filePath, {
    recursive: true,
  });
}

const storageContestFiles = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, filePath);
  },
  filename(req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});

module.exports.uploadAvatar = multer({ storage: storageContestFiles }).single('file');

module.exports.uploadContestFiles = multer({ storage: storageContestFiles }).array(
  'files', 3);

module.exports.updateContestFile = multer({ storage: storageContestFiles }).single(
  'file');

module.exports.uploadLogoFiles = multer({ storage: storageContestFiles }).single(
  'offerData');


