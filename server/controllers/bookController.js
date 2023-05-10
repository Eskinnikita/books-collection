const mongoose = require('mongoose');
const Book = require('../models/Book');

const addBook = async (req, res) => {
  try {
    const book = new Book({ ...req.body });
    const newBook = await book.save();
    return res.json({ message: 'Книга успешно добавлена', result: newBook });
  } catch (e) {
    return res.status(500).json({ message: 'Ошибка сервера' });
  }
};

const getUserBooks = async (req, res) => {
  try {
    const userId = req.params.id;
    const books = await Book.aggregate([
      {
        $match: { user_id: new mongoose.Types.ObjectId(userId) },
      },
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
    ]);
    return res.json({ result: books });
  } catch (e) {
    return res.status(500).json({ message: 'Ошибка сервера', error: e.message });
  }
};

module.exports = {
  addBook,
  getUserBooks,
};
