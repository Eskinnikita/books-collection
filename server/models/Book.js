const { Schema, model, default: mongoose } = require('mongoose');

const Book = new Schema({
  series_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Series' },
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  subtitle: { type: String },
  volume: { type: String },
  cover: { type: String },
  isSingle: { type: Boolean, default: false, required: true },
});

module.exports = model('Book', Book);
