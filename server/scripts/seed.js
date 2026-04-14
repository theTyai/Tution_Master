/**
 * Tution Master — Database Seeder
 * Run: node scripts/seed.js
 */

require('dotenv').config({ path: '../.env' });
const mongoose = require('mongoose');
const { User, Tutor, Course, Lesson } = require('../models');

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/tution-master';

const sampleCourses = [
  {
    title: 'Advanced Mathematics for Class 11-12',
    description: 'Complete mathematics course covering calculus, algebra, coordinate geometry, and statistics aligned with Nepal\'s +2 syllabus.',
    shortDesc: 'Master Class 11-12 Mathematics with expert guidance.',
    category: 'Mathematics',
    level: 'Advanced',
    price: 1200,
    tags: ['mathematics', 'calculus', 'algebra', 'SEE', 'class 12'],
    targetAudience: ['Class 11-12 Students', 'IOE Aspirants'],
    whatYouLearn: ['Differentiation & Integration', 'Matrices & Determinants', 'Coordinate Geometry', 'Statistics & Probability'],
    requirements: ['Basic Algebra', 'Class 10 Mathematics'],
    isFeatured: true,
  },
  {
    title: 'Computer Programming with Python',
    description: 'Learn Python programming from scratch. Perfect for students new to coding and those preparing for computer science exams.',
    shortDesc: 'Start your coding journey with Python.',
    category: 'Computer',
    level: 'Beginner',
    price: 900,
    tags: ['python', 'programming', 'coding', 'computer science'],
    targetAudience: ['Beginners', 'Class 11-12 Students', 'BCA Aspirants'],
    whatYouLearn: ['Python Basics & Syntax', 'Functions & Modules', 'OOP Concepts', 'File Handling & Projects'],
    requirements: ['Basic Computer Knowledge'],
    isFeatured: true,
  },
  {
    title: 'Engineering Entrance Exam Complete Preparation',
    description: 'Comprehensive preparation for IOE, Pulchowk, and other engineering entrance examinations in Nepal. Covers Physics, Chemistry, and Mathematics.',
    shortDesc: 'Crack IOE entrance with confidence.',
    category: 'Engineering',
    level: 'Advanced',
    price: 2500,
    discountPrice: 1999,
    tags: ['IOE', 'engineering entrance', 'pulchowk', 'physics', 'chemistry', 'maths'],
    targetAudience: ['Engineering Aspirants', '+2 Science Students'],
    whatYouLearn: ['Full Physics Syllabus', 'Organic & Inorganic Chemistry', 'Advanced Mathematics', '1000+ Practice MCQs'],
    requirements: ['+2 Science (Physics, Chemistry, Mathematics)'],
    isFeatured: true,
  },
  {
    title: 'Science Complete Course (+2 NEB)',
    description: 'Covers Physics, Chemistry, and Biology for NEB +2 examinations with detailed explanations and practice questions.',
    shortDesc: 'Complete +2 Science in one place.',
    category: 'Science',
    level: 'Intermediate',
    price: 1500,
    tags: ['physics', 'chemistry', 'biology', '+2', 'NEB', 'science'],
    targetAudience: ['Class 11-12 Students', 'Medical Aspirants'],
    isFeatured: false,
  },
  {
    title: 'English Communication & Writing',
    description: 'Improve your English speaking, writing, and comprehension skills essential for academic success and career development.',
    shortDesc: 'Speak and write English with confidence.',
    category: 'English',
    level: 'Beginner',
    price: 800,
    tags: ['english', 'communication', 'grammar', 'writing', 'speaking'],
    targetAudience: ['All Students', 'Job Seekers'],
    isFeatured: false,
  },
];

const sampleLessons = [
  { title: 'Introduction to the Course', duration: 15, order: 1, isFree: true, description: 'Welcome and course overview.' },
  { title: 'Chapter 1: Fundamentals', duration: 45, order: 2, isFree: false },
  { title: 'Practice Problems — Chapter 1', duration: 30, order: 3, isFree: false },
  { title: 'Chapter 2: Deep Dive', duration: 60, order: 4, isFree: false },
  { title: 'Live Q&A Recap', duration: 20, order: 5, isFree: false },
];

async function seed() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('Connected to MongoDB');

    // Clear existing data
    await User.deleteMany({});
    await Tutor.deleteMany({});
    await Course.deleteMany({});
    await Lesson.deleteMany({});
    console.log('Cleared existing data');

    // Create Admin
    const admin = await User.create({
      name: 'Sumit Yadav',
      email: 'sumit@tutionmaster.com',
      password: 'Admin@1234',
      role: 'admin',
      country: 'Nepal',
      bio: 'Founder of Tution Master, NIT Jamshedpur passout. Passionate about making quality education accessible for every Nepali student.',
    });
    console.log('✅ Admin created:', admin.email);

    // Create Tutors
    const tutorUsers = await User.insertMany([
      { name: 'Rajesh Sharma', email: 'rajesh@tutionmaster.com', password: 'Tutor@1234', role: 'tutor', country: 'Nepal' },
      { name: 'Priya Maharjan', email: 'priya@tutionmaster.com', password: 'Tutor@1234', role: 'tutor', country: 'Nepal' },
      { name: 'Anup KC', email: 'anup@tutionmaster.com', password: 'Tutor@1234', role: 'tutor', country: 'Nepal' },
      { name: 'Sita Basnet', email: 'sita@tutionmaster.com', password: 'Tutor@1234', role: 'tutor', country: 'Nepal' },
    ]);
    console.log('✅ Tutors created');

    // Create Tutor Profiles
    await Tutor.insertMany([
      { user: admin._id, subjects: ['Computer Science', 'Programming'], experience: 5, rating: 5.0, totalStudents: 2400, isApproved: true, education: [{ institution: 'NIT Jamshedpur', degree: 'B.Tech CSE', year: 2019 }] },
      { user: tutorUsers[0]._id, subjects: ['Mathematics'], experience: 8, rating: 4.9, totalStudents: 3100, isApproved: true },
      { user: tutorUsers[1]._id, subjects: ['Chemistry', 'Physics'], experience: 6, rating: 4.8, totalStudents: 1800, isApproved: true },
      { user: tutorUsers[2]._id, subjects: ['Engineering Entrance'], experience: 7, rating: 4.9, totalStudents: 4200, isApproved: true },
      { user: tutorUsers[3]._id, subjects: ['English'], experience: 4, rating: 4.9, totalStudents: 1200, isApproved: true },
    ]);
    console.log('✅ Tutor profiles created');

    // Create Sample Student
    await User.create({
      name: 'Aarav Sharma',
      email: 'student@gmail.com',
      password: 'Student@1234',
      role: 'student',
      country: 'Nepal',
      level: 'Engineering Entrance',
    });
    console.log('✅ Sample student created');

    // Create Courses
    for (let i = 0; i < sampleCourses.length; i++) {
      const instructorId = i === 0 ? tutorUsers[0]._id : i === 1 ? admin._id : i === 2 ? tutorUsers[2]._id : tutorUsers[1]._id;
      const course = await Course.create({
        ...sampleCourses[i],
        instructor: instructorId,
        isPublished: true,
        rating: (4.7 + Math.random() * 0.3).toFixed(1),
        totalStudents: Math.floor(Math.random() * 3000) + 500,
        totalReviews: Math.floor(Math.random() * 2000) + 100,
      });

      // Add lessons to each course
      const lessonDocs = await Lesson.insertMany(sampleLessons.map(l => ({ ...l, course: course._id })));
      course.lessons = lessonDocs.map(l => l._id);
      course.totalLessons = lessonDocs.length;
      course.totalDuration = lessonDocs.reduce((s, l) => s + l.duration, 0);
      await course.save();
    }
    console.log('✅ Courses and lessons created');

    console.log('\n🎉 Seed completed successfully!');
    console.log('─────────────────────────────────────');
    console.log('Admin:   sumit@tutionmaster.com  / Admin@1234');
    console.log('Student: student@gmail.com       / Student@1234');
    console.log('─────────────────────────────────────');
    process.exit(0);
  } catch (err) {
    console.error('Seed error:', err);
    process.exit(1);
  }
}

seed();
