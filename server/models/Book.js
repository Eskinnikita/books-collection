const { Schema, model, default: mongoose } = require('mongoose');

const Book = new Schema({
  series_id: { type: mongoose.ObjectId, ref: 'Series' },
  subtitle: { type: String },
  volume: { type: String },
  cover: { type: String },
  isSingle: { type: Boolean, default: true, required: true },
});

module.exports = model('Book', Book);
