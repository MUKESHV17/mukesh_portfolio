import express from 'express';
import Skill from '../models/Skill.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// @desc    Get all skills
// @route   GET /api/skills
// @access  Public
router.get('/', async (req, res, next) => {
  try {
    const skills = await Skill.find().sort({ order: 1 });
    res.status(200).json({ success: true, count: skills.length, data: skills });
  } catch (error) {
    next(error);
  }
});

// @desc    Create a skill
// @route   POST /api/skills
// @access  Private
router.post('/', protect, async (req, res, next) => {
  try {
    const skill = await Skill.create(req.body);
    res.status(201).json({ success: true, data: skill });
  } catch (error) {
    next(error);
  }
});

// @desc    Update a skill
// @route   PUT /api/skills/:id
// @access  Private
router.put('/:id', protect, async (req, res, next) => {
  try {
    const skill = await Skill.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    if (!skill) {
      return res.status(404).json({ success: false, error: 'Skill not found' });
    }

    res.status(200).json({ success: true, data: skill });
  } catch (error) {
    next(error);
  }
});

// @desc    Delete a skill
// @route   DELETE /api/skills/:id
// @access  Private
router.delete('/:id', protect, async (req, res, next) => {
  try {
    const skill = await Skill.findByIdAndDelete(req.params.id);

    if (!skill) {
      return res.status(404).json({ success: false, error: 'Skill not found' });
    }

    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    next(error);
  }
});

export default router;
