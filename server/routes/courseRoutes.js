const express = require('express');
const router = express.Router();
const { getCourses, getCourse, createCourse, updateCourse, getFeaturedCourses, addLesson } = require('../controllers/courseController');
const { protect, tutorOrAdmin } = require('../middleware/auth');

router.get('/', getCourses);
router.get('/featured', getFeaturedCourses);
router.get('/:id', getCourse);
router.post('/', protect, tutorOrAdmin, createCourse);
router.put('/:id', protect, tutorOrAdmin, updateCourse);
router.post('/:id/lessons', protect, tutorOrAdmin, addLesson);

module.exports = router;
