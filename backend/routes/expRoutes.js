import express from 'express';
import Experience from '../models/Experience.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// @desc    Get all experience
// @route   GET /api/exp
// @access  Public
router.get('/', async (req, res, next) => {
  try {
    const exps = await Experience.find().sort({ order: 1 });
    res.status(200).json({ success: true, count: exps.length, data: exps });
  } catch (error) {
    next(error);
  }
});

// @desc    Create experience
// @route   POST /api/exp
// @access  Private
router.post('/', protect, async (req, res, next) => {
  try {
    const exp = await Experience.create(req.body);
    res.status(201).json({ success: true, data: exp });
  } catch (error) {
    next(error);
  }
});

// @desc    Update experience
// @route   PUT /api/exp/:id
// @access  Private
router.put('/:id', protect, async (req, res, next) => {
  try {
    const exp = await Experience.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    if (!exp) {
      return res.status(404).json({ success: false, error: 'Experience item not found' });
    }

    res.status(200).json({ success: true, data: exp });
  } catch (error) {
    next(error);
  }
});

// @desc    Delete experience
// @route   DELETE /api/exp/:id
// @access  Private
router.delete('/:id', protect, async (req, res, next) => {
  try {
    const exp = await Experience.findByIdAndDelete(req.params.id);

    if (!exp) {
      return res.status(404).json({ success: false, error: 'Experience item not found' });
    }

    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    next(error);
  }
});

export default router;
