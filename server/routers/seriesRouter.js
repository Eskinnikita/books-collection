const Router = require('express');

const router = new Router();
const controller = require('../controllers/seriesController');
const validateRequest = require('../middlewares/validateRequest');
const seriesValidator = require('../validators/seriesValidators/seriesValidator');

// Add new publisher
router.post(
  '/',
  seriesValidator,
  validateRequest,
  controller.addSeries,
);

// Get all publishers
router.get('/', controller.getSeries);

// Get series by publisher
router.get('/:id', controller.getSeriesByPublisher);
module.exports = router;
