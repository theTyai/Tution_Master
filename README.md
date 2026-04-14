# 🎓 Tution Master — Nepal's EdTech Platform

> **"Learn Smarter. Achieve Faster."**
> Founded by **Sumit Yadav** (NIT Jamshedpur) · Built for Nepal's students

---

## 📋 Project Overview

Tution Master is a full-stack MERN EdTech platform designed for students in Nepal preparing for school exams, +2, engineering entrance, medical entrance, and skill development courses.

### 🛠 Tech Stack

| Layer     | Technology                                      |
|-----------|-------------------------------------------------|
| Frontend  | React 18 + Vite + TailwindCSS + Framer Motion   |
| Backend   | Node.js + Express.js                            |
| Database  | MongoDB + Mongoose                              |
| Auth      | JWT (JSON Web Tokens)                           |
| Real-time | Socket.IO (Live Classes)                        |
| State     | Zustand                                         |
| Charts    | Recharts                                        |
| Payments  | Khalti + eSewa (Nepal)                          |
| Storage   | Cloudinary (videos/images)                      |

---

## 🚀 Quick Start

### Prerequisites
- Node.js v18+
- MongoDB (local or Atlas)
- Git

### 1. Clone & Install
```bash
git clone https://github.com/theTyai/Tution-Master.git
cd tution-master

# Install all dependencies
npm run install:all
```

### 2. Configure Environment
```bash
cp server/.env.example server/.env
# Edit server/.env with your values:
# - MONGO_URI
# - JWT_SECRET
# - CLOUDINARY credentials
# - Email credentials
```

### 3. Seed the Database
```bash
npm run seed
# This creates:
# Admin:   sumit@tutionmaster.com / Admin@1234
# Student: student@gmail.com     / Student@1234
```

### 4. Start Development Server
```bash
npm run dev
# Frontend: http://localhost:3000
# Backend:  http://localhost:5000
```

---

## 📁 Project Structure

```
tution-master/
├── client/                    # React Frontend
│   ├── src/
│   │   ├── pages/
│   │   │   ├── LandingPage.jsx      # Home page with all sections
│   │   │   ├── AuthPage.jsx         # Login & Register
│   │   │   ├── DashboardPage.jsx    # Student dashboard
│   │   │   ├── CoursesPage.jsx      # Course catalog
│   │   │   ├── CourseDetail.jsx     # Single course
│   │   │   ├── LearnPage.jsx        # Video player + curriculum
│   │   │   ├── TutorsPage.jsx       # Tutor directory
│   │   │   ├── ProfilePage.jsx      # User profile
│   │   │   └── AdminPage.jsx        # Admin dashboard
│   │   ├── components/
│   │   │   └── common/
│   │   │       ├── Navbar.jsx
│   │   │       └── Footer.jsx
│   │   ├── store/
│   │   │   └── index.js             # Zustand stores (auth, courses, dashboard)
│   │   ├── App.jsx                  # Router setup
│   │   └── main.jsx                 # Entry point
│   ├── tailwind.config.js
│   └── vite.config.js
│
├── server/                    # Express Backend
│   ├── controllers/
│   │   ├── authController.js        # Login, register, profile
│   │   └── courseController.js      # CRUD, enrollment, lessons
│   ├── models/
│   │   └── index.js                 # All Mongoose models
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── courseRoutes.js
│   │   ├── userRoutes.js
│   │   ├── tutorRoutes.js
│   │   ├── enrollmentRoutes.js
│   │   ├── reviewRoutes.js
│   │   ├── paymentRoutes.js
│   │   ├── adminRoutes.js
│   │   └── liveClassRoutes.js
│   ├── middleware/
│   │   └── auth.js                  # JWT protect + role guards
│   ├── scripts/
│   │   └── seed.js                  # Database seeder
│   ├── index.js                     # Server entry + Socket.IO
│   └── .env.example
│
└── package.json               # Root with concurrently scripts
```

---

## 🗄️ Database Models

### User
```
name, email, password (bcrypt), role (student/tutor/admin),
country, level, enrolledCourses[], wishlist[], learningStreak
```

### Course
```
title, slug, description, instructor (ref: User), category,
level, price, discountPrice, lessons[], rating, totalStudents,
isPublished, isFeatured, whatYouLearn[], requirements[]
```

### Lesson
```
course (ref), title, videoUrl, duration, order,
resources[], quiz[{question, options, correct}], isFree
```

### Enrollment
```
student (ref), course (ref), payment (ref),
completedLessons[], progress (0-100), isCompleted, lastAccessed
```

### Tutor
```
user (ref), subjects[], experience, rating, totalStudents,
courses[], isApproved, sessionRate, availability[]
```

### Payment
```
student, course, amount, currency (NPR), method (khalti/esewa),
status (pending/completed/failed), transactionId
```

### LiveClass
```
title, course, tutor, scheduledAt, duration, roomId,
status (scheduled/live/ended), attendees[], recording
```

---

## 🔌 API Endpoints

### Auth
```
POST   /api/auth/register        # Create account
POST   /api/auth/login           # Login → JWT
GET    /api/auth/me              # Get profile (protected)
PUT    /api/auth/me              # Update profile (protected)
PUT    /api/auth/change-password # Change password (protected)
```

### Courses
```
GET    /api/courses              # List (filter: category, level, search)
GET    /api/courses/featured     # Featured courses
GET    /api/courses/:id          # Course detail + lessons
POST   /api/courses              # Create (tutor/admin)
PUT    /api/courses/:id          # Update (tutor/admin)
POST   /api/courses/:id/lessons  # Add lesson (tutor/admin)
```

### Users/Dashboard
```
GET    /api/users/dashboard      # Student dashboard data
GET    /api/users/progress       # Learning progress
GET    /api/users/wishlist       # Wishlist
POST   /api/users/wishlist/:id   # Toggle wishlist
```

### Enrollments
```
POST   /api/enrollments                      # Enroll in course
PUT    /api/enrollments/:id/lesson/:lessonId # Mark lesson complete
```

### Reviews
```
POST   /api/reviews              # Submit review (enrolled students only)
```

### Payments
```
POST   /api/payments/initiate    # Start payment
PUT    /api/payments/:id/verify  # Verify & activate enrollment
```

### Admin
```
GET    /api/admin/stats          # Platform analytics
PUT    /api/admin/tutors/:id/approve # Approve tutor
```

### Live Classes
```
GET    /api/live                 # Upcoming classes
POST   /api/live                 # Schedule class (tutor)
```

---

## 🎨 Design System

- **Primary**: `#4f8ef7` (Blue)
- **Secondary**: `#8b5cf6` (Purple)
- **Background**: `#0a0e1a` → `#0f1526` → `#141c30`
- **Fonts**: Sora (headings) + Nunito (body)
- **Dark-first** responsive design

---

## 🔒 Security Features

- bcrypt password hashing (salt rounds: 12)
- JWT authentication (30-day expiry)
- Rate limiting (100 req / 15 min)
- Helmet.js security headers
- CORS configured
- Role-based route protection (student / tutor / admin)

---

## 🌟 Features

### Student Features
- ✅ Register/Login with JWT
- ✅ Browse & search courses
- ✅ Enroll in courses (free/paid)
- ✅ Watch video lessons
- ✅ Track progress per course
- ✅ Mark lessons complete
- ✅ Attend live classes (Socket.IO)
- ✅ Take quizzes & tests
- ✅ Earn certificates
- ✅ Wishlist courses
- ✅ Write reviews

### Tutor Features
- ✅ Create & manage courses
- ✅ Upload lessons
- ✅ Schedule live classes
- ✅ View student analytics

### Admin Features
- ✅ Platform-wide analytics
- ✅ Approve/reject tutors
- ✅ Manage all users & courses
- ✅ View revenue & payments

---

## 💳 Nepal Payment Integration

Supports:
- **Khalti** — Most popular digital wallet in Nepal
- **eSewa** — Widely used payment gateway
- **Razorpay** — International card payments

---

## 🚀 Deployment

### Frontend (Vercel)
```bash
cd client && npm run build
# Deploy /dist to Vercel
```

### Backend (Railway / Render)
```bash
# Set environment variables
# Deploy /server directory
# MongoDB Atlas for production DB
```

---

## 👨‍💻 About the Founder

**Sumit Yadav** — Founder & Lead Developer  
B.Tech Computer Science, **NIT Jamshedpur**  
Passionate about making quality education accessible for every student in Nepal.

---

## 📄 License

MIT License — © 2024 Tution Master

---

*Built with ❤️ for Nepal 🇳🇵*
