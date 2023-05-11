const mongoose = require('mongoose');
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
    const series = await Series.aggregate([
      // Match the series of the publisher
      { $match: { publisher_id: new mongoose.Types.ObjectId(req.params.id) } },

      // Lookup the books related to each series
      {
        $lookup: {
          from: 'books',
          localField: '_id',
          foreignField: 'series_id',
          as: 'books',
        },
      },
      {
        $addFields: {
          volumes: {
            $filter: {
              input: {
                $map: {
                  input: '$books',
                  as: 'book',
                  in: { $toInt: '$$book.volume' },
                },
              },
              as: 'volume',
              cond: { $gte: ['$$volume', 0] },
            },
          },
          lastVolume: {
            $cond: {
              if: { $gt: [{ $size: '$books' }, 0] },
              then: { $toInt: { $max: '$books.volume' } },
              else: null,
            },
          },
        },
      },
      {
        $project: {
          books: 0,
        },
      },
    ]);
    return res.json({ result: series });
  } catch (e) {
    return res.status(500).json({ message: 'Ошибка сервера', error: e.message });
  }
};

const getSeries = async (req, res) => {
  try {
    const series = await Series.find();
    return res.json({ result: series });
  } catch (e) {
    return res.status(500).json({ message: 'Ошибка сервера' });
  }
};

module.exports = {
  addSeries,
  getSeries,
  getSeriesByPublisher,
};
