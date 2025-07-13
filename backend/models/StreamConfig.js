const mongoose = require('mongoose');

const StreamConfigSchema = new mongoose.Schema({
  url: String,
  updatedAt: { type: Date, default: Date.now },
});

const StreamConfig = mongoose.model('StreamConfig', StreamConfigSchema);

module.exports = StreamConfig;
