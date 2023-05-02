const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const Role = require('../models/Role');
const User = require('../models/User');

require('dotenv').config();

const jwtSecret = process.env.JWT_SECRET;

// Generate access token
const generateAccessToken = (id, roles) => {
  const payload = {
    id,
    roles,
  };
  return jwt.sign(payload, jwtSecret, { expiresIn: '24h' });
};
class userController {
  async registration(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res
          .status(400)
          .json({ message: 'Ошибка при регистрации', errors });
      }
      const { email, username, password } = req.body;
      const candidate = await User.findOne({ email });
      if (candidate) {
        return res.status(404).json({ message: 'Пользователь уже существует' });
      }

      const hashPassword = bcrypt.hashSync(password, 7);
      const userRole = await Role.findOne({ value: 'USER' });
      const user = new User({
        email,
        username,
        password: hashPassword,
        roles: [userRole.value],
      });

      await user.save();
      return res.json({ message: 'Пользователь успешно зарегистрирован' });
    } catch (e) {
      return res.status(500).json({ message: 'Ошибка сервера' });
    }
  }

  async login(req, res) {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });
      if (!user) {
        return res
          .status(404)
          .json({ message: `Пользователь с почтой ${email} не найден` });
      }
      const validPassword = bcrypt.compareSync(password, user.password);
      if (!validPassword) {
        return res.status(404).json({ message: 'Введен неверный пароль' });
      }

      // eslint-disable-next-line no-underscore-dangle
      const token = generateAccessToken(user._id, user.roles);
      res.json({ user, token });
    } catch (e) {
      return res.status(500).json({ message: 'Ошибка авторизации' });
    }
  }

  async getUsers(req, res) {
    try {
      const users = await User.find();
      res.json(users);
    } catch (e) {
      return res.status(500).json({ message: 'Ошибка сервера' });
    }
  }
}

module.exports = new userController();
