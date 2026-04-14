const express = require('express');
const router = express.Router();
const { createBooking, getMyBookings, updateBookingStatus } = require('../controllers/bookingController');
const { protect, authorize } = require('../middleware/auth');

router.post('/', protect, authorize('student'), createBooking);
router.get('/mybookings', protect, getMyBookings);
router.put('/:id', protect, authorize('tutor'), updateBookingStatus);

module.exports = router;
