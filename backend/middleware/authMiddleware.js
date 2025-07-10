const jwt = require('jsonwebtoken');
const User = require('../models/User.js');

// 🔐 Middleware to protect routes (JWT-based)
const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1];
      console.log('🔑 Token received:', token);

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log('✅ Token decoded:', decoded);

      req.user = await User.findById(decoded.id).select('-password');
      if (!req.user) {
        console.log('❌ User not found in DB');
        return res.status(401).json({ message: 'User not found' });
      }

      console.log(`👤 Authenticated user: ${req.user.email} (${req.user.role})`);
      next();
    } catch (err) {
      console.error('❌ Token verification failed:', err.message);
      res.status(401).json({ message: 'Not authorized, token failed' });
    }
  } else {
    console.log('⛔ No token provided in headers');
    res.status(401).json({ message: 'No token, authorization denied' });
  }
};

// 🔒 Middleware for role-based access
const roleCheck = (roles) => {
  return (req, res, next) => {
    console.log(`🔍 Checking role access for: ${req.user.role}`);
    if (!roles.includes(req.user.role)) {
      console.warn(`🚫 Access denied. Allowed: ${roles.join(', ')}, User: ${req.user.role}`);
      return res.status(403).json({ message: 'Forbidden: insufficient role' });
    }

    console.log('✅ Role allowed:', req.user.role);
    next();
  };
};

module.exports = { protect, roleCheck };
