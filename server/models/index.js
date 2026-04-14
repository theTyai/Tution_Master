/**
 * Tution Master — MongoDB Models
 */

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// ─── USER MODEL ───────────────────────────────────────────────────────────────
const userSchema = new mongoose.Schema({
  name:          { type: String, required: true, trim: true },
  email:         { type: String, required: true, unique: true, lowercase: true, trim: true },
  password:      { type: String, required: true, minlength: 6, select: false },
  role:          { type: String, enum: ['student', 'tutor', 'admin'], default: 'student' },
  avatar:        { type: String, default: '' },
  country:       { type: String, default: 'Nepal' },
  phone:         { type: String, default: '' },
  level:         { type: String, enum: ['Class 9-10', 'Class 11-12', 'Engineering Entrance', 'Medical Entrance', 'University', 'Other'], default: 'Class 11-12' },
  bio:           { type: String, default: '' },
  enrolledCourses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Enrollment' }],
  wishlist:      [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }],
  certificates:  [{ type: mongoose.Schema.Types.ObjectId, ref: 'Certificate' }],
  isEmailVerified: { type: Boolean, default: false },
  emailVerifyToken: String,
  passwordResetToken: String,
  passwordResetExpiry: Date,
  lastActive:    { type: Date, default: Date.now },
  learningStreak: { type: Number, default: 0 },
  totalLessonsCompleted: { type: Number, default: 0 },
}, { timestamps: true });

userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});
userSchema.methods.comparePassword = async function(candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};
const User = mongoose.model('User', userSchema);

// ─── TUTOR MODEL ──────────────────────────────────────────────────────────────
const tutorSchema = new mongoose.Schema({
  user:       { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  subjects:   [{ type: String }],
  expertise:  [{ type: String }],
  education:  [{ institution: String, degree: String, year: Number }],
  experience: { type: Number, default: 0 }, // years
  rating:     { type: Number, default: 0, min: 0, max: 5 },
  totalReviews: { type: Number, default: 0 },
  totalStudents: { type: Number, default: 0 },
  courses:    [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }],
  isApproved: { type: Boolean, default: false },
  sessionRate: { type: Number, default: 500 }, // NPR per hour
  availability: [{
    day: { type: String, enum: ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'] },
    slots: [String]
  }],
  totalEarnings: { type: Number, default: 0 },
}, { timestamps: true });
const Tutor = mongoose.model('Tutor', tutorSchema);

// ─── COURSE MODEL ─────────────────────────────────────────────────────────────
const courseSchema = new mongoose.Schema({
  title:       { type: String, required: true, trim: true },
  slug:        { type: String, unique: true },
  description: { type: String, required: true },
  shortDesc:   { type: String },
  instructor:  { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  tutor:       { type: mongoose.Schema.Types.ObjectId, ref: 'Tutor' },
  category:    { type: String, required: true, enum: ['Mathematics', 'Science', 'Computer', 'Engineering', 'Medical', 'English', 'Social', 'Other'] },
  level:       { type: String, enum: ['Beginner', 'Intermediate', 'Advanced'], default: 'Beginner' },
  targetAudience: [{ type: String }],
  price:       { type: Number, required: true, min: 0 },
  discountPrice: { type: Number },
  thumbnail:   { type: String, default: '' },
  previewVideo: { type: String, default: '' },
  lessons:     [{ type: mongoose.Schema.Types.ObjectId, ref: 'Lesson' }],
  totalDuration: { type: Number, default: 0 }, // minutes
  totalLessons: { type: Number, default: 0 },
  rating:      { type: Number, default: 0 },
  totalReviews: { type: Number, default: 0 },
  totalStudents: { type: Number, default: 0 },
  tags:        [{ type: String }],
  language:    { type: String, default: 'Nepali/English' },
  isPublished: { type: Boolean, default: false },
  isFeatured:  { type: Boolean, default: false },
  requirements: [{ type: String }],
  whatYouLearn: [{ type: String }],
}, { timestamps: true });

courseSchema.pre('save', function(next) {
  if (this.isModified('title')) {
    this.slug = this.title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
  }
  next();
});
const Course = mongoose.model('Course', courseSchema);

// ─── LESSON MODEL ─────────────────────────────────────────────────────────────
const lessonSchema = new mongoose.Schema({
  course:      { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
  title:       { type: String, required: true },
  description: { type: String },
  videoUrl:    { type: String },
  duration:    { type: Number, default: 0 }, // minutes
  order:       { type: Number, required: true },
  resources:   [{ title: String, url: String, type: { type: String, enum: ['pdf', 'link', 'video', 'image'] } }],
  quiz: [{
    question:  { type: String },
    options:   [String],
    correct:   { type: Number },
    explanation: { type: String },
  }],
  isFree:      { type: Boolean, default: false },
  isPublished: { type: Boolean, default: true },
}, { timestamps: true });
const Lesson = mongoose.model('Lesson', lessonSchema);

// ─── ENROLLMENT MODEL ─────────────────────────────────────────────────────────
const enrollmentSchema = new mongoose.Schema({
  student: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  course:  { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
  payment: { type: mongoose.Schema.Types.ObjectId, ref: 'Payment' },
  completedLessons: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Lesson' }],
  progress:  { type: Number, default: 0 }, // percentage 0-100
  isCompleted: { type: Boolean, default: false },
  completedAt: Date,
  lastAccessed: { type: Date, default: Date.now },
  quizScores: [{ lesson: mongoose.Schema.Types.ObjectId, score: Number, total: Number }],
}, { timestamps: true });
const Enrollment = mongoose.model('Enrollment', enrollmentSchema);

// ─── REVIEW MODEL ─────────────────────────────────────────────────────────────
const reviewSchema = new mongoose.Schema({
  student: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  course:  { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
  rating:  { type: Number, required: true, min: 1, max: 5 },
  comment: { type: String, required: true },
  isApproved: { type: Boolean, default: true },
}, { timestamps: true });
const Review = mongoose.model('Review', reviewSchema);

// ─── PAYMENT MODEL ────────────────────────────────────────────────────────────
const paymentSchema = new mongoose.Schema({
  student:  { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  course:   { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
  amount:   { type: Number, required: true },
  currency: { type: String, default: 'NPR' },
  method:   { type: String, enum: ['khalti', 'esewa', 'card', 'bank', 'free'], default: 'khalti' },
  status:   { type: String, enum: ['pending', 'completed', 'failed', 'refunded'], default: 'pending' },
  transactionId: String,
  receipt:  String,
}, { timestamps: true });
const Payment = mongoose.model('Payment', paymentSchema);

// ─── LIVE CLASS MODEL ─────────────────────────────────────────────────────────
const liveClassSchema = new mongoose.Schema({
  title:    { type: String, required: true },
  course:   { type: mongoose.Schema.Types.ObjectId, ref: 'Course' },
  tutor:    { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  scheduledAt: { type: Date, required: true },
  duration: { type: Number, default: 60 }, // minutes
  meetLink: { type: String },
  roomId:   { type: String, unique: true },
  status:   { type: String, enum: ['scheduled', 'live', 'ended'], default: 'scheduled' },
  attendees: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  recording: { type: String },
  notes:    { type: String },
}, { timestamps: true });
const LiveClass = mongoose.model('LiveClass', liveClassSchema);

// ─── CERTIFICATE MODEL ────────────────────────────────────────────────────────
const certificateSchema = new mongoose.Schema({
  student:  { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  course:   { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
  issuedAt: { type: Date, default: Date.now },
  certId:   { type: String, unique: true },
  pdfUrl:   String,
}, { timestamps: true });
const Certificate = mongoose.model('Certificate', certificateSchema);

module.exports = { User, Tutor, Course, Lesson, Enrollment, Review, Payment, LiveClass, Certificate };
