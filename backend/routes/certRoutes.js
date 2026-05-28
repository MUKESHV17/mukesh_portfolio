import express from 'express';
import Certification from '../models/Certification.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// @desc    Get all certifications
// @route   GET /api/certs
// @access  Public
router.get('/', async (req, res, next) => {
  try {
    const certs = await Certification.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: certs.length, data: certs });
  } catch (error) {
    next(error);
  }
});

// @desc    Create a certification
// @route   POST /api/certs
// @access  Private
router.post('/', protect, async (req, res, next) => {
  try {
    const cert = await Certification.create(req.body);
    res.status(201).json({ success: true, data: cert });
  } catch (error) {
    next(error);
  }
});

// @desc    Update a certification
// @route   PUT /api/certs/:id
// @access  Private
router.put('/:id', protect, async (req, res, next) => {
  try {
    const cert = await Certification.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    if (!cert) {
      return res.status(404).json({ success: false, error: 'Certification not found' });
    }

    res.status(200).json({ success: true, data: cert });
  } catch (error) {
    next(error);
  }
});

// @desc    Delete a certification
// @route   DELETE /api/certs/:id
// @access  Private
router.delete('/:id', protect, async (req, res, next) => {
  try {
    const cert = await Certification.findByIdAndDelete(req.params.id);

    if (!cert) {
      return res.status(404).json({ success: false, error: 'Certification not found' });
    }

    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    next(error);
  }
});

export default router;
