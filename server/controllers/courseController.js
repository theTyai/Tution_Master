/**
 * Tution Master — Course Controller
 */

const asyncHandler = require('express-async-handler');
const { Course, Lesson, Enrollment, Review } = require('../models');

// @desc    Get all published courses (with filters)
// @route   GET /api/courses
// @access  Public
const getCourses = asyncHandler(async (req, res) => {
  const { category, level, search, sort, page = 1, limit = 12 } = req.query;

  const query = { isPublished: true };
  if (category) query.category = category;
  if (level)    query.level = level;
  if (search)   query.$text = { $search: search };

  const sortOptions = {
    newest: { createdAt: -1 },
    popular: { totalStudents: -1 },
    rating: { rating: -1 },
    price_asc: { price: 1 },
    price_desc: { price: -1 },
  };

  const total = await Course.countDocuments(query);
  const courses = await Course.find(query)
    .populate('instructor', 'name avatar')
    .sort(sortOptions[sort] || sortOptions.newest)
    .skip((page - 1) * limit)
    .limit(Number(limit))
    .select('-lessons');

  res.json({
    success: true,
    data: courses,
    pagination: { total, page: Number(page), pages: Math.ceil(total / limit) },
  });
});

// @desc    Get single course (full details)
// @route   GET /api/courses/:id
// @access  Public
const getCourse = asyncHandler(async (req, res) => {
  const course = await Course.findById(req.params.id)
    .populate('instructor', 'name avatar bio')
    .populate({ path: 'lessons', match: { isPublished: true }, select: '-quiz', options: { sort: { order: 1 } } });

  if (!course) return res.status(404).json({ success: false, message: 'Course not found' });

  // If student is enrolled, send full lesson data
  let enrolled = false;
  if (req.user) {
    const enrollment = await Enrollment.findOne({ student: req.user._id, course: course._id });
    enrolled = !!enrollment;
  }

  const reviews = await Review.find({ course: course._id, isApproved: true })
    .populate('student', 'name avatar')
    .sort({ createdAt: -1 })
    .limit(10);

  res.json({ success: true, data: { ...course.toObject(), enrolled, reviews } });
});

// @desc    Create course
// @route   POST /api/courses
// @access  Private/Tutor+Admin
const createCourse = asyncHandler(async (req, res) => {
  const course = await Course.create({ ...req.body, instructor: req.user._id });
  res.status(201).json({ success: true, data: course });
});

// @desc    Update course
// @route   PUT /api/courses/:id
// @access  Private/Tutor+Admin
const updateCourse = asyncHandler(async (req, res) => {
  let course = await Course.findById(req.params.id);
  if (!course) return res.status(404).json({ success: false, message: 'Course not found' });

  if (course.instructor.toString() !== req.user._id.toString() && req.user.role !== 'admin')
    return res.status(403).json({ success: false, message: 'Not authorized to update this course' });

  course = await Course.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
  res.json({ success: true, data: course });
});

// @desc    Get featured courses
// @route   GET /api/courses/featured
// @access  Public
const getFeaturedCourses = asyncHandler(async (req, res) => {
  const courses = await Course.find({ isPublished: true, isFeatured: true })
    .populate('instructor', 'name avatar')
    .limit(6)
    .select('-lessons');
  res.json({ success: true, data: courses });
});

// @desc    Add lesson to course
// @route   POST /api/courses/:id/lessons
// @access  Private/Tutor+Admin
const addLesson = asyncHandler(async (req, res) => {
  const course = await Course.findById(req.params.id);
  if (!course) return res.status(404).json({ success: false, message: 'Course not found' });

  const lesson = await Lesson.create({ ...req.body, course: course._id, order: course.totalLessons + 1 });

  course.lessons.push(lesson._id);
  course.totalLessons = course.lessons.length;
  course.totalDuration += lesson.duration || 0;
  await course.save();

  res.status(201).json({ success: true, data: lesson });
});

module.exports = { getCourses, getCourse, createCourse, updateCourse, getFeaturedCourses, addLesson };
