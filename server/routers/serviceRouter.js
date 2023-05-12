const Router = require('express');

const router = new Router();
const multer = require('multer');
const controller = require('../controllers/imageController');

const upload = multer({
  storage: multer.memoryStorage(),
});

// Upload image to yandex disk
router.post(
  '/image/yandex/:id',
  upload.single('file'),
  controller.uploadImage,
);

// Upload image to yandex disk
router.post(
  '/image/imgur/:id',
  upload.single('file'),
  controller.uploadImageImgur,
);

module.exports = router;
