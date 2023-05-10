const Router = require('express');

const router = new Router();
const controller = require('../controllers/bookController');
const validateRequest = require('../middlewares/validateRequest');
const bookValidator = require('../validators/bookValidator/bookValidator');

// Add new publisher
router.post(
  '/',
  bookValidator,
  validateRequest,
  controller.addBook,
);

// Get user books
router.get(
  '/:id',
  controller.getUserBooks,
);

module.exports = router;
