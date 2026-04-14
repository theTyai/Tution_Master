/**
 * Tution Master – Express Server Entry Point
 * Founded by Sumit Yadav (NIT Jamshedpur)
 */

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const { createServer } = require('http');
const { Server } = require('socket.io');
require('dotenv').config();

const app = express();
const httpServer = createServer(app);

// ─── Socket.IO for Live Classes ───────────────────────────────────────────────
const io = new Server(httpServer, {
  cors: { origin: process.env.CLIENT_URL || 'http://localhost:3000', methods: ['GET', 'POST'] },
});

io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  socket.on('join-class', ({ classId, userId }) => {
    socket.join(classId);
    io.to(classId).emit('user-joined', { userId, message: 'A new student joined the class!' });
  });

  socket.on('send-message', ({ classId, message, user }) => {
    io.to(classId).emit('receive-message', { message, user, timestamp: new Date() });
  });

  socket.on('raise-hand', ({ classId, userId }) => {
    io.to(classId).emit('hand-raised', { userId });
  });

  socket.on('disconnect', () => console.log('User disconnected:', socket.id));
});

// ─── Middleware ────────────────────────────────────────────────────────────────
app.use(helmet());
app.use(morgan('dev'));
app.use(cors({ origin: process.env.CLIENT_URL || 'http://localhost:3000', credentials: true }));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Rate limiting
const limiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 100, message: 'Too many requests, please try again later.' });
app.use('/api/', limiter);

// ─── Routes ───────────────────────────────────────────────────────────────────
app.use('/api/auth',        require('./routes/authRoutes'));
app.use('/api/courses',     require('./routes/courseRoutes'));
app.use('/api/users',       require('./routes/userRoutes'));
app.use('/api/tutors',      require('./routes/tutorRoutes'));
app.use('/api/lessons',     require('./routes/lessonRoutes'));
app.use('/api/enrollments', require('./routes/enrollmentRoutes'));
app.use('/api/reviews',     require('./routes/reviewRoutes'));
app.use('/api/payments',    require('./routes/paymentRoutes'));
app.use('/api/admin',       require('./routes/adminRoutes'));
app.use('/api/live',        require('./routes/liveClassRoutes'));

// Health check
app.get('/api/health', (_, res) => res.json({ status: 'OK', platform: 'Tution Master', timestamp: new Date() }));

// ─── Error Handler ────────────────────────────────────────────────────────────
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({ success: false, message: err.message || 'Internal Server Error' });
});

// ─── Database & Server ────────────────────────────────────────────────────────
const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/tution-master', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('✅ MongoDB connected');
  httpServer.listen(PORT, () => console.log(`🚀 Tution Master server running on port ${PORT}`));
}).catch(err => {
  console.error('❌ MongoDB connection error:', err);
  process.exit(1);
});

module.exports = { app, io };
