const { body } = require('express-validator');

const registrationValidator = [
  body('email')
    .isEmail()
    .withMessage('Введите настоящую почту')
    .notEmpty()
    .withMessage('Поле не может быть пустым'),
  body('username')
    .notEmpty()
    .withMessage('Поле не может быть пустым'),
  body('password')
    .isLength({ min: 4, max: 10 })
    .withMessage('Поле должно быть больше 4, но меньше 10 символов')
    .notEmpty()
    .withMessage('Поле не может быть пустым'),
];

module.exports = registrationValidator;
