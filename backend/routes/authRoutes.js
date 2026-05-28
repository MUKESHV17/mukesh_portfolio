import express from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// @desc    Authenticate admin user & get token
// @route   POST /api/auth/login
// @access  Public
router.post('/login', async (req, res, next) => {
  const { username, password } = req.body;

  try {
    // Check for username and password
    if (!username || !password) {
      return res.status(400).json({ success: false, error: 'Please provide both username and password' });
    }

    // Check for user (must explicitly select password since schema has select: false)
    const user = await User.findOne({ username }).select('+password');

    if (!user) {
      return res.status(401).json({ success: false, error: 'Invalid credentials' });
    }

    // Check if password matches
    const isMatch = await user.matchPassword(password);

    if (!isMatch) {
      return res.status(401).json({ success: false, error: 'Invalid credentials' });
    }

    // Create JWT Token
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET || 'super_secret_cyberpunk_neon_key_change_me_in_production',
      { expiresIn: process.env.JWT_EXPIRE || '7d' }
    );

    res.status(200).json({
      success: true,
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email
      }
    });

  } catch (error) {
    next(error);
  }
});

// @desc    Verify JWT token & return user info
// @route   GET /api/auth/verify
// @access  Private (Protected by JWT)
router.get('/verify', protect, async (req, res) => {
  res.status(200).json({
    success: true,
    user: {
      id: req.user._id,
      username: req.user.username,
      email: req.user.email
    }
  });
});

export default router;
