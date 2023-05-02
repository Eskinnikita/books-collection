const jwt = require('jsonwebtoken');
require('dotenv').config();

const secret = process.env.JWT_SECRET;

// Check user's JWToken
module.exports = (req, res, next) => {
  if (req.method === 'OPTIONS') {
    next();
  }

  try {
    const token = req.headers.authorization.split(' ')[1];
    if (!token) {
      return res.status(403).json({ message: 'Пользователь не авторизован' });
    }

    req.user = jwt.verify(token, secret);
    next();
  } catch (e) {
    return res.status(403).json({ message: 'Пользователь не авторизован' });
  }
};
