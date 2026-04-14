/**
 * Tution Master — Auth Controller
 */

const asyncHandler = require('express-async-handler');
const { User } = require('../models');
const { generateToken } = require('../middleware/auth');

// @desc    Register new student
// @route   POST /api/auth/register
// @access  Public
const register = asyncHandler(async (req, res) => {
  const { name, email, password, country, level, role } = req.body;

  if (!name || !email || !password)
    return res.status(400).json({ success: false, message: 'Please provide name, email, and password' });

  const userExists = await User.findOne({ email });
  if (userExists) return res.status(400).json({ success: false, message: 'User already exists with this email' });

  const user = await User.create({ name, email, password, country: country || 'Nepal', level, role: role === 'tutor' ? 'tutor' : 'student' });

  res.status(201).json({
    success: true,
    message: 'Account created successfully!',
    data: {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      country: user.country,
      level: user.level,
      avatar: user.avatar,
      token: generateToken(user._id),
    },
  });
});

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res.status(400).json({ success: false, message: 'Please provide email and password' });

  const user = await User.findOne({ email }).select('+password');
  if (!user || !(await user.comparePassword(password)))
    return res.status(401).json({ success: false, message: 'Invalid email or password' });

  user.lastActive = new Date();
  await user.save({ validateBeforeSave: false });

  res.json({
    success: true,
    message: 'Login successful',
    data: {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      country: user.country,
      level: user.level,
      avatar: user.avatar,
      learningStreak: user.learningStreak,
      token: generateToken(user._id),
    },
  });
});

// @desc    Get current user profile
// @route   GET /api/auth/me
// @access  Private
const getMe = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id)
    .populate('enrolledCourses')
    .populate('wishlist', 'title thumbnail price rating');

  res.json({ success: true, data: user });
});

// @desc    Update profile
// @route   PUT /api/auth/me
// @access  Private
const updateMe = asyncHandler(async (req, res) => {
  const allowedFields = ['name', 'phone', 'bio', 'avatar', 'country', 'level'];
  const updates = {};
  allowedFields.forEach(f => { if (req.body[f] !== undefined) updates[f] = req.body[f]; });

  const user = await User.findByIdAndUpdate(req.user._id, updates, { new: true, runValidators: true });
  res.json({ success: true, data: user });
});

// @desc    Change password
// @route   PUT /api/auth/change-password
// @access  Private
const changePassword = asyncHandler(async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  const user = await User.findById(req.user._id).select('+password');

  if (!(await user.comparePassword(currentPassword)))
    return res.status(400).json({ success: false, message: 'Current password is incorrect' });

  user.password = newPassword;
  await user.save();
  res.json({ success: true, message: 'Password changed successfully' });
});

module.exports = { register, login, getMe, updateMe, changePassword };
