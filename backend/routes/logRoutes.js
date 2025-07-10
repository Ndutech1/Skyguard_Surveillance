const express = require('express');
const ActivityLog = require('../models/ActivityLog');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/', protect, async (req, res) => {
  const allowedRoles = ['ceo', 'teamlead', 'camphead', 'pilot'];
  if (!allowedRoles.includes(req.user.role))
    return res.status(403).json({ message: 'Access denied' });

  try {
    const logs = await ActivityLog.find()
      .sort({ timestamp: -1 })
      .populate('performedBy', 'name role');
    res.json(logs);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch logs' });
  }
});

module.exports = router;
