const {
  Schema, model,
  mongoose,
} = require('mongoose');

const Publisher = new Schema({
  name: { type: String, required: true, unique: true },
});

module.exports = model('Publisher', Publisher);
