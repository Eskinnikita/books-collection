const Publisher = require('../models/Publisher');

const addPublisher = async (req, res) => {
  try {
    const { name } = req.body;

    const existedPublished = await Publisher.findOne({ name: { $regex: new RegExp(`^${name.replace(/\s+/g, '\\s*')}$`, 'i') } });
    if (existedPublished) {
      return res.status(400).json({ message: 'Такой издатель уже есть в базе данных' });
    }
    const publisher = new Publisher({ ...req.body });
    const newPublisher = await publisher.save();
    return res.json({ message: 'Издатель успешно добавлен', result: newPublisher });
  } catch (e) {
    return res.status(500).json({ message: 'Ошибка сервера' });
  }
};

const getPublishers = async (req, res) => {
  try {
    const publishers = await Publisher.find();
    return res.json({ result: publishers });
  } catch (e) {
    return res.status(500).json({ message: 'Ошибка сервера' });
  }
};

module.exports = {
  addPublisher,
  getPublishers,
};
