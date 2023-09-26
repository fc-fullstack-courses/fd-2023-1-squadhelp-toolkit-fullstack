const fs = require('fs');
const multer = require('multer');
const { FILES_PATH } = require('../constants');

const imagesFilePath = `${FILES_PATH}/images`;

const contestsFilePath = `${FILES_PATH}/contests`;

if (!fs.existsSync(imagesFilePath)) {
  fs.mkdirSync(imagesFilePath, {
    recursive: true,
  });
}

if (!fs.existsSync(contestsFilePath)) {
  fs.mkdirSync(contestsFilePath, {
    recursive: true,
  });
}

const storageImageFiles = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, imagesFilePath);
  },
  filename(req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});

const storageContestFiles = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, contestsFilePath);
  },
  filename(req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});


module.exports.uploadAvatar = multer({ storage: storageImageFiles }).single('file');

const multerFilesMW = multer({ storage: storageContestFiles });

module.exports.uploadContestFiles = multerFilesMW.array('files', 3);

module.exports.updateContestFile = multerFilesMW.single('file');

module.exports.uploadLogoFiles = multerFilesMW.single('offerData');
