const Router = require('express');

const router = new Router();
const multer = require('multer');
const controller = require('../controllers/imageController');

const upload = multer({
  storage: multer.memoryStorage(),
});

// Upload image to yandex disk
router.post(
  '/image/:id',
  upload.single('file'),
  controller.uploadImage,
);

module.exports = router;
