const mongoose = require('mongoose');
const Book = require('../models/Book');

const bookSeriesQuery = [
  {
    $lookup: {
      from: 'series',
      localField: 'series_id',
      foreignField: '_id',
      as: 'series',
    },
  },
  {
    $unwind: '$series',
  },
];

const addBook = async (req, res) => {
  try {
    const book = new Book({ ...req.body });
    const newBook = await book.save();
    const bookWithMeta = await Book.aggregate([
      {
        $match: { _id: new mongoose.Types.ObjectId(newBook.id) },
      },
      ...bookSeriesQuery,
    ]);
    return res.json({ message: 'Книга успешно добавлена', result: bookWithMeta });
  } catch (e) {
    return res.status(500).json({ message: 'Ошибка сервера' });
  }
};

const getUserBooks = async (req, res) => {
  try {
    const userId = req.params.id;
    const books = await Book.aggregate([
      {
        $match: {
          user_id: new mongoose.Types.ObjectId(userId),
          notReleased: false,
        },
      },
      ...bookSeriesQuery,
    ]);
    const sortedBooks = books.sort((a, b) => {
      if (a.series.name < b.series.name) return -1;
      if (a.series.name > b.series.name) return 1;

      if (!a.volume || a.volume < 0) return 1;
      if (!b.volume || b.volume < 0) return -1;
      return a.volume - b.volume;
    });
    return res.json({ result: sortedBooks });
  } catch (e) {
    return res.status(500).json({ message: 'Ошибка сервера', error: e.message });
  }
};

module.exports = {
  addBook,
  getUserBooks,
};
