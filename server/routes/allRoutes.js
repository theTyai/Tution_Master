// userRoutes.js
const express = require('express');
const { protect, adminOnly } = require('../middleware/auth');
const { User, Enrollment } = require('../models');

const userRouter = express.Router();

userRouter.get('/dashboard', protect, async (req, res) => {
  const enrollments = await Enrollment.find({ student: req.user._id })
    .populate('course', 'title thumbnail category rating totalLessons')
    .sort({ lastAccessed: -1 });
  res.json({ success: true, data: { user: req.user, enrollments } });
});

userRouter.get('/progress', protect, async (req, res) => {
  const enrollments = await Enrollment.find({ student: req.user._id }).populate('course', 'title');
  const progress = enrollments.map(e => ({ course: e.course.title, progress: e.progress, completedLessons: e.completedLessons.length }));
  res.json({ success: true, data: progress });
});

userRouter.get('/wishlist', protect, async (req, res) => {
  const user = await User.findById(req.user._id).populate('wishlist', 'title thumbnail price rating instructor');
  res.json({ success: true, data: user.wishlist });
});

userRouter.post('/wishlist/:courseId', protect, async (req, res) => {
  const user = await User.findById(req.user._id);
  const idx = user.wishlist.indexOf(req.params.courseId);
  if (idx === -1) user.wishlist.push(req.params.courseId);
  else user.wishlist.splice(idx, 1);
  await user.save();
  res.json({ success: true, data: user.wishlist });
});

// Admin: list all users
userRouter.get('/', protect, adminOnly, async (req, res) => {
  const users = await User.find().select('-password').sort({ createdAt: -1 });
  res.json({ success: true, data: users });
});

module.exports = userRouter;

// ─────────────────────────────────────────────────────────────────────────────
// tutorRoutes.js  (exported as separate module but included here for brevity)
const tutorRouter = express.Router();
const { Tutor } = require('../models');

tutorRouter.get('/', async (req, res) => {
  const tutors = await Tutor.find({ isApproved: true }).populate('user', 'name avatar email').sort({ rating: -1 });
  res.json({ success: true, data: tutors });
});

tutorRouter.post('/apply', protect, async (req, res) => {
  const exists = await Tutor.findOne({ user: req.user._id });
  if (exists) return res.status(400).json({ success: false, message: 'You already applied' });
  const tutor = await Tutor.create({ user: req.user._id, ...req.body });
  res.status(201).json({ success: true, data: tutor, message: 'Application submitted! We will review within 2-3 business days.' });
});

// ─────────────────────────────────────────────────────────────────────────────
// enrollmentRoutes.js
const enrollRouter = express.Router();

enrollRouter.post('/', protect, async (req, res) => {
  const { courseId } = req.body;
  const exists = await Enrollment.findOne({ student: req.user._id, course: courseId });
  if (exists) return res.status(400).json({ success: false, message: 'Already enrolled' });
  const enrollment = await Enrollment.create({ student: req.user._id, course: courseId });
  // Update course student count
  const { Course } = require('../models');
  await Course.findByIdAndUpdate(courseId, { $inc: { totalStudents: 1 } });
  res.status(201).json({ success: true, data: enrollment });
});

enrollRouter.put('/:id/lesson/:lessonId', protect, async (req, res) => {
  const enrollment = await Enrollment.findById(req.params.id);
  if (!enrollment.completedLessons.includes(req.params.lessonId)) {
    enrollment.completedLessons.push(req.params.lessonId);
  }
  const { Course } = require('../models');
  const course = await Course.findById(enrollment.course);
  enrollment.progress = Math.round((enrollment.completedLessons.length / course.totalLessons) * 100);
  if (enrollment.progress >= 100) { enrollment.isCompleted = true; enrollment.completedAt = new Date(); }
  enrollment.lastAccessed = new Date();
  await enrollment.save();
  res.json({ success: true, data: enrollment });
});

// ─────────────────────────────────────────────────────────────────────────────
// reviewRoutes.js
const reviewRouter = express.Router();

reviewRouter.post('/', protect, async (req, res) => {
  const { courseId, rating, comment } = req.body;
  const enrollment = await Enrollment.findOne({ student: req.user._id, course: courseId });
  if (!enrollment) return res.status(400).json({ success: false, message: 'You must be enrolled to review' });
  const review = await Review.create({ student: req.user._id, course: courseId, rating, comment });
  // Recalculate course rating
  const { Course } = require('../models');
  const reviews = await Review.find({ course: courseId });
  const avgRating = reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length;
  await Course.findByIdAndUpdate(courseId, { rating: avgRating.toFixed(1), totalReviews: reviews.length });
  res.status(201).json({ success: true, data: review });
});

// ─────────────────────────────────────────────────────────────────────────────
// paymentRoutes.js
const paymentRouter = express.Router();
const { Payment } = require('../models');

paymentRouter.post('/initiate', protect, async (req, res) => {
  const { courseId, method } = req.body;
  const { Course } = require('../models');
  const course = await Course.findById(courseId);
  if (!course) return res.status(404).json({ success: false, message: 'Course not found' });
  const payment = await Payment.create({ student: req.user._id, course: courseId, amount: course.discountPrice || course.price, method });
  res.json({ success: true, data: payment, message: `Payment of NPR ${payment.amount} initiated via ${method}` });
});

paymentRouter.put('/:id/verify', protect, async (req, res) => {
  const payment = await Payment.findByIdAndUpdate(req.params.id, { status: 'completed', transactionId: req.body.transactionId }, { new: true });
  // Auto-enroll student
  await enrollRouter.route('/').post;
  res.json({ success: true, data: payment });
});

// ─────────────────────────────────────────────────────────────────────────────
// adminRoutes.js
const adminRouter = express.Router();
const { protect: p, adminOnly: ao } = require('../middleware/auth');

adminRouter.get('/stats', p, ao, async (req, res) => {
  const { Course } = require('../models');
  const [users, courses, payments, enrollments] = await Promise.all([
    User.countDocuments(),
    Course.countDocuments({ isPublished: true }),
    Payment.aggregate([{ $match: { status: 'completed' } }, { $group: { _id: null, total: { $sum: '$amount' } } }]),
    Enrollment.countDocuments(),
  ]);
  res.json({ success: true, data: { totalUsers: users, totalCourses: courses, totalRevenue: payments[0]?.total || 0, totalEnrollments: enrollments } });
});

adminRouter.put('/tutors/:id/approve', p, ao, async (req, res) => {
  await Tutor.findByIdAndUpdate(req.params.id, { isApproved: true });
  res.json({ success: true, message: 'Tutor approved!' });
});

// ─────────────────────────────────────────────────────────────────────────────
// lessonRoutes.js  &  liveClassRoutes.js
const lessonRouter = express.Router();
const { Lesson } = require('../models');
lessonRouter.get('/:id', protect, async (req, res) => {
  const lesson = await Lesson.findById(req.params.id);
  if (!lesson) return res.status(404).json({ success: false, message: 'Lesson not found' });
  res.json({ success: true, data: lesson });
});

const liveRouter = express.Router();
const { LiveClass } = require('../models');
liveRouter.get('/', protect, async (req, res) => {
  const classes = await LiveClass.find({ scheduledAt: { $gte: new Date() } })
    .populate('tutor', 'name avatar').sort({ scheduledAt: 1 });
  res.json({ success: true, data: classes });
});
liveRouter.post('/', protect, async (req, res) => {
  const lc = await LiveClass.create({ ...req.body, tutor: req.user._id, roomId: `tm-${Date.now()}` });
  res.status(201).json({ success: true, data: lc });
});

// Export all routers
module.exports = { userRouter, tutorRouter, enrollRouter, reviewRouter, paymentRouter, adminRouter, lessonRouter, liveRouter };
