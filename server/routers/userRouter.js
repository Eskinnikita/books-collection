const Router = require('express');

const router = new Router();
const controller = require('../controllers/userController');
const roleMiddleware = require('../middlewares/roleMiddleware');
const validateRequest = require('../middlewares/validateRequest');
const loginValidator = require('../validators/userValidators/loginValidator');

// User registration
router.post(
  '/registration',
  loginValidator,
  validateRequest,
  controller.registration,
);

// User login
router.post('/login', loginValidator, validateRequest, controller.login);

// Get all users
router.get('/users', roleMiddleware(['ADMIN']), controller.getUsers);

module.exports = router;
