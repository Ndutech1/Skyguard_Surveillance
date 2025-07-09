import express from 'express';
import ActivityLog from '../models/ActivityLog.js';
import { verifyToken } from '../middleware/auth.js';

const router = express.Router();

router.get('/', verifyToken, async (req, res) => {
  const allowedRoles = ['ceo', 'teamlead', 'camphead'];
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

export default router;
