const { Schema, model, default: mongoose } = require('mongoose');

const Book = new Schema({
  series_id: { type: mongoose.ObjectId, ref: 'Series', required: true },
  subtitle: {
    type: String,
  },
  volume: {
    type: String,
  },
});

module.exports = model('Book', Book);
