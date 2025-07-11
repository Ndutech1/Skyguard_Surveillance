const express = require('express');
const Trend = require('../models/Trend');
const { protect, roleCheck } = require('../middleware/authMiddleware'); // ✅ destructure correctly

const router = express.Router();

// GET: all trends
router.get('/', async (req, res) => {
  try {
    const trends = await Trend.find().sort({ createdAt: -1 });
    res.json(trends);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch trends' });
  }
});

// POST: upload a new trend (CEO or TeamLead only)
router.post('/', protect, roleCheck(['ceo', 'teamlead']), async (req, res) => {
  const { title, description, imageUrl } = req.body;

  const trend = new Trend({
    title,
    description,
    imageUrl,
    uploadedBy: req.user.role,
  });

  try {
    await trend.save();

    // Emit new trend alert via socket.io
    const io = req.app.get('io');
    io?.emit?.('newTrend', trend); // optional chaining in case socket not active

    res.status(201).json(trend);
  } catch (err) {
    res.status(500).json({ message: 'Failed to save trend' });
  }
});

module.exports = router;
