// models/Trend.js
const mongoose = require('mongoose');

const trendSchema = new mongoose.Schema({
  title: String,
  description: String,
  imageUrl: String,
  uploadedBy: String,
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

const Trend = mongoose.model('Trend', trendSchema);

module.exports = Trend;
