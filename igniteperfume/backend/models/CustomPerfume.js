const mongoose = require('mongoose');

const CustomPerfumeSchema = new mongoose.Schema({
  baseNote: String,
  middleNote: String,
  topNote: String,
  bottleSize: String,
  customName: String,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('CustomPerfume', CustomPerfumeSchema);
