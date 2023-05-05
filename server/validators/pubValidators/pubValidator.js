const { body } = require('express-validator');

const pubValidator = [
  body('name')
    .notEmpty()
    .withMessage('Поле не может быть пустым'),
];

module.exports = pubValidator;
