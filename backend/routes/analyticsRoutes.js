import express from 'express';
import Report from '../models/reportModel.js';
const router = express.Router();

// GET /api/analytics/summary
router.get('/summary', async (req, res) => {
  try {
    const totalReports = await Report.countDocuments();
    
    const reportsByRole = await Report.aggregate([
      { $group: { _id: "$role", count: { $sum: 1 } } }
    ]);

    const reportsByDate = await Report.aggregate([
      {
        $group: {
          _id: {
            $dateToString: { format: "%Y-%m-%d", date: "$createdAt" }
          },
          count: { $sum: 1 }
        }
      },
      { $sort: { _id: 1 } }
    ]);

    res.json({
      totalReports,
      reportsByRole,
      reportsByDate
    });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching analytics' });
  }
});

export default router;
