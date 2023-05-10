const { body } = require('express-validator');

const pubValidator = [
  body('series_id')
    .notEmpty()
    .withMessage('Поле не может быть пустым'),
  body('user_id')
    .notEmpty()
    .withMessage('Поле не может быть пустым'),
  body('volume')
    .notEmpty()
    .withMessage('Поле не может быть пустым'),
];

module.exports = pubValidator;
