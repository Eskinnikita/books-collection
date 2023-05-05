const Series = require('../models/Series');

const addSeries = async (req, res) => {
  try {
    const { name } = req.body;

    const existedSeries = await Series.findOne({ name: { $regex: new RegExp(`^${name.replace(/\s+/g, '\\s*')}$`, 'i') } });
    if (existedSeries) {
      return res.status(400).json({ message: 'Такая серия уже существует!' });
    }
    const series = new Series({ ...req.body });
    const newSeries = await series.save();
    return res.json({ message: 'Серия успешно добавлена', result: newSeries });
  } catch (e) {
    return res.status(500).json({ message: 'Ошибка сервера' });
  }
};

const getSeriesByPublisher = async (req, res) => {
  try {
    const serieses = await Series.find({ publisher_id: req.params.id });
    return res.json({ result: serieses });
  } catch (e) {
    return res.status(500).json({ message: 'Ошибка сервера' });
  }
};

const getSerieses = async (req, res) => {
  try {
    const serieses = await Series.find();
    return res.json({ result: serieses });
  } catch (e) {
    return res.status(500).json({ message: 'Ошибка сервера' });
  }
};

module.exports = {
  addSeries,
  getSerieses,
  getSeriesByPublisher,
};
