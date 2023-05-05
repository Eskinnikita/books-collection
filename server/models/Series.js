const {
  Schema, model,
  mongoose,
} = require('mongoose');

const Series = new Schema({
  publisher_id: { type: mongoose.ObjectId, ref: 'Series' },
  name: { type: String, required: true, unique: true },
  format: { type: Number, default: 1, required: true },
  type: { type: Number, default: 1, required: true },
});

module.exports = model('Series', Series);
