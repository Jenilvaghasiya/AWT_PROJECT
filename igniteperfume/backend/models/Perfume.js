const mongoose = require('mongoose');

const PerfumeSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  image: String, // store filename
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Perfume', PerfumeSchema);
