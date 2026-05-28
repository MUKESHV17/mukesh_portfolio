import express from 'express';
import Message from '../models/Message.js';
import { protect } from '../middleware/auth.js';
import { sendAdminAlertEmail, sendVisitorAckEmail } from '../utils/mailer.js';

const router = express.Router();

// @desc    Submit a contact message (Send email alerts)
// @route   POST /api/messages
// @access  Public
router.post('/', async (req, res, next) => {
  const { name, email, subject, message } = req.body;

  try {
    if (!name || !email || !subject || !message) {
      return res.status(400).json({ success: false, error: 'Please fill in all contact form fields' });
    }

    const newMessage = await Message.create({
      name,
      email,
      subject,
      message
    });

    // Fire email alerts asynchronously (do not block the client response!)
    Promise.all([
      sendAdminAlertEmail({ name, email, subject, message }),
      sendVisitorAckEmail({ name, email, subject })
    ]).catch(err => console.error('Background Email Dispatch Failed:', err.message));

    res.status(201).json({
      success: true,
      message: 'Message sent successfully! A confirmation receipt has been dispatched to your inbox.',
      data: newMessage
    });
  } catch (error) {
    next(error);
  }
});

// @desc    Get all messages
// @route   GET /api/messages
// @access  Private
router.get('/', protect, async (req, res, next) => {
  try {
    const messages = await Message.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: messages.length, data: messages });
  } catch (error) {
    next(error);
  }
});

// @desc    Mark a message as read
// @route   PUT /api/messages/:id/read
// @access  Private
router.put('/:id/read', protect, async (req, res, next) => {
  try {
    const message = await Message.findByIdAndUpdate(
      req.params.id,
      { isRead: true },
      { new: true }
    );

    if (!message) {
      return res.status(404).json({ success: false, error: 'Message not found' });
    }

    res.status(200).json({ success: true, data: message });
  } catch (error) {
    next(error);
  }
});

// @desc    Delete a message
// @route   DELETE /api/messages/:id
// @access  Private
router.delete('/:id', protect, async (req, res, next) => {
  try {
    const message = await Message.findByIdAndDelete(req.params.id);

    if (!message) {
      return res.status(404).json({ success: false, error: 'Message not found' });
    }

    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    next(error);
  }
});

export default router;
