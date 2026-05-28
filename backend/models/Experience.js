import mongoose from 'mongoose';

const experienceSchema = new mongoose.Schema({
  role: {
    type: String,
    required: [true, 'Please add a role/position title'],
    trim: true
  },
  company: {
    type: String,
    required: [true, 'Please add a company/organisation name'],
    trim: true
  },
  duration: {
    type: String,
    required: [true, 'Please add duration (e.g. Oct 2025 - Present)'],
    trim: true
  },
  description: {
    type: [String],
    required: [true, 'Please add at least one description bullet point']
  },
  order: {
    type: Number,
    default: 0
  }
}, { timestamps: true });

const Experience = mongoose.model('Experience', experienceSchema);
export default Experience;
