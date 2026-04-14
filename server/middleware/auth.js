/**
 * Tution Master — Auth Middleware
 */

const jwt = require('jsonwebtoken');
const { User } = require('../models');

// Generate JWT Token
const generateToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET || 'tution_master_secret_2024', { expiresIn: '30d' });

// Protect routes — verify JWT
const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization?.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) return res.status(401).json({ success: false, message: 'Not authorized, no token' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'tution_master_secret_2024');
    req.user = await User.findById(decoded.id).select('-password');
    if (!req.user) return res.status(401).json({ success: false, message: 'User not found' });
    next();
  } catch {
    return res.status(401).json({ success: false, message: 'Token invalid or expired' });
  }
};

// Admin only
const adminOnly = (req, res, next) => {
  if (req.user?.role !== 'admin') return res.status(403).json({ success: false, message: 'Admin access required' });
  next();
};

// Tutor or Admin
const tutorOrAdmin = (req, res, next) => {
  if (!['tutor', 'admin'].includes(req.user?.role))
    return res.status(403).json({ success: false, message: 'Tutor or Admin access required' });
  next();
};

module.exports = { protect, adminOnly, tutorOrAdmin, generateToken };
