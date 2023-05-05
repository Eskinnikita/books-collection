const { body } = require('express-validator');

const seriesValidator = [
  body('publisher_id')
    .notEmpty()
    .withMessage('Поле не может быть пустым'),
  body('name')
    .notEmpty()
    .withMessage('Поле не может быть пустым'),
  body('format')
    .notEmpty()
    .withMessage('Поле не может быть пустым'),
  body('type')
    .notEmpty()
    .withMessage('Поле не может быть пустым'),
];

module.exports = seriesValidator;
