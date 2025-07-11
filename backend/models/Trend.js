// models/Trend.js
import mongoose from 'mongoose';

const trendSchema = new mongoose.Schema({
  title: String,
  description: String,
  imageUrl: String,
  uploadedBy: String, // 'ceo' or 'teamlead'
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

const Trend = mongoose.model('Trend', trendSchema);
export default Trend;
