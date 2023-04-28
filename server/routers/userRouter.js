const Router = require('express');

const router = new Router();
const controller = require('../controllers/authController');
const authMiddleware = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');
const validateRequest = require('../middlewares/validateRequest');

const loginValidator = require('../validators/authValidators/loginValidator');

// User registration
router.post(
  '/registration',
  loginValidator,
  validateRequest,
  controller.registation,
);

// User login
router.post('/login', loginValidator, validateRequest, controller.login);

// Get all users
router.get('/users', roleMiddleware(['ADMIN']), controller.getUsers);

module.exports = router;
