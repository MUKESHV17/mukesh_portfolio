import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import rateLimit from 'express-rate-limit';
import connectDB from './config/db.js';
import errorHandler from './middleware/errorHandler.js';

// Route imports
import authRoutes from './routes/authRoutes.js';
import projectRoutes from './routes/projectRoutes.js';
import skillRoutes from './routes/skillRoutes.js';
import certRoutes from './routes/certRoutes.js';
import expRoutes from './routes/expRoutes.js';
import messageRoutes from './routes/messageRoutes.js';
import githubRoutes from './routes/githubRoutes.js';

// Load env variables
dotenv.config();

// Connect to Database
connectDB();

const app = express();

// Enable CORS with support for credentials and custom headers
app.use(cors({
  origin: '*', // For local development; in production, restrict to portfolio URL
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Body parser
app.use(express.json());

// Apply Rate Limiting to secure public gateways from spam
const standardLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per window
  message: { success: false, error: 'Too many requests from this IP, please try again later.' }
});

const contactLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 5, // Limit each IP to 5 contact submissions per hour to prevent spamming nodemailer
  message: { success: false, error: 'Spam alert: You have submitted too many messages. Please try again in an hour.' }
});

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // Limit each IP to 10 admin login attempts
  message: { success: false, error: 'Security alert: Too many login attempts. Gateway locked for 15 minutes.' }
});

// Bind Limiters
app.use('/api/', standardLimiter);
app.use('/api/messages', contactLimiter);
app.use('/api/auth/login', loginLimiter);

// Bind API Routes
app.use('/api/auth', authRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/skills', skillRoutes);
app.use('/api/certs', certRoutes);
app.use('/api/exp', expRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/github', githubRoutes);

// Server Status Check
app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Mukesh V Premium Cyberpunk Portfolio API Online',
    timestamp: new Date()
  });
});

// Diagnostic Frontend Error logger
app.post('/api/debug-log', (req, res) => {
  console.log('\n🚨🚨🚨 [FRONTEND RUNTIME EXCEPTION] 🚨🚨🚨');
  console.log(req.body.error || 'Unknown frontend crash');
  console.log('🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨\n');
  res.status(200).json({ success: true });
});

// Error handling middleware
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
});

// Handle unhandled promise rejections gracefully
process.on('unhandledRejection', (err, promise) => {
  console.error(`Unhandled Rejection Error: ${err.message}`);
  // Close server & exit process
  server.close(() => process.exit(1));
});
