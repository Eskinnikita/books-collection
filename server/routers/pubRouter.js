const Router = require('express');

const router = new Router();
const controller = require('../controllers/pubController');
const validateRequest = require('../middlewares/validateRequest');
const pubValidator = require('../validators/pubValidators/pubValidator');

// Add new publisher
router.post(
  '/',
  pubValidator,
  validateRequest,
  controller.addPublisher,
);
module.exports = router;
