const User = require('../models/User');

// @desc    Get all tutors
// @route   GET /api/tutors
// @access  Public
const getTutors = async (req, res) => {
  try {
    const tutors = await User.find({ role: 'tutor' }).select('-password');
    res.json(tutors);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get tutor by ID
// @route   GET /api/tutors/:id
// @access  Public
const getTutorById = async (req, res) => {
  try {
    const tutor = await User.findById(req.params.id).select('-password');
    if (tutor && tutor.role === 'tutor') {
      res.json(tutor);
    } else {
      res.status(404).json({ message: 'Tutor not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update tutor profile
// @route   PUT /api/tutors/profile
// @access  Private (Tutor only)
const updateTutorProfile = async (req, res) => {
  try {
    const tutor = await User.findById(req.user._id);

    if (tutor && tutor.role === 'tutor') {
      tutor.name = req.body.name || tutor.name;
      tutor.expertise = req.body.expertise || tutor.expertise;
      tutor.bio = req.body.bio || tutor.bio;
      tutor.hourlyRate = req.body.hourlyRate || tutor.hourlyRate;

      const updatedTutor = await tutor.save();
      res.json({
        _id: updatedTutor._id,
        name: updatedTutor.name,
        expertise: updatedTutor.expertise,
        bio: updatedTutor.bio,
        hourlyRate: updatedTutor.hourlyRate,
      });
    } else {
      res.status(404).json({ message: 'Tutor profile not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getTutors, getTutorById, updateTutorProfile };
