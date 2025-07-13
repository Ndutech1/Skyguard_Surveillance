// models/StreamConfig.js
import mongoose from 'mongoose';

const streamConfigSchema = new mongoose.Schema({
  url: String,
  updatedBy: String,
  updatedAt: { type: Date, default: Date.now },
});

export default mongoose.model('StreamConfig', streamConfigSchema);
