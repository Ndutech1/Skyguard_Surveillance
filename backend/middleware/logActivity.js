import ActivityLog from '../models/ActivityLog.js';

export const logActivity = async (user, action, details = '') => {
  try {
    const log = new ActivityLog({
      action,
      performedBy: user.id,
      role: user.role,
      details
    });
    await log.save();
  } catch (err) {
    console.error('Failed to log activity:', err.message);
  }
};
