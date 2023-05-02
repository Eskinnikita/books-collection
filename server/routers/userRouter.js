const Router = require('express');

const router = new Router();
const controller = require('../controllers/userController');
const roleMiddleware = require('../middlewares/roleMiddleware');
const validateRequest = require('../middlewares/validateRequest');
const loginValidator = require('../validators/userValidators/loginValidator');
const regValidator = require('../validators/userValidators/regValidator');

// User registration
router.post(
  '/registration',
  regValidator,
  validateRequest,
  controller.registration,
);

// User login
router.post('/login', loginValidator, validateRequest, controller.login);

// Get all users
router.get('/users', roleMiddleware(['ADMIN']), controller.getUsers);

module.exports = router;
