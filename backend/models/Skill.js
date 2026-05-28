import mongoose from 'mongoose';

const skillSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a skill name'],
    trim: true
  },
  category: {
    type: String,
    required: [true, 'Please select a skill category'],
    enum: {
      values: ['Languages', 'Frontend', 'Backend', 'Databases', 'AI/ML', 'Other'],
      message: '{VALUE} is not a valid category'
    }
  },
  level: {
    type: String,
    enum: ['Beginner', 'Intermediate', 'Advanced'],
    default: 'Intermediate'
  },
  order: {
    type: Number,
    default: 0
  }
}, { timestamps: true });

const Skill = mongoose.model('Skill', skillSchema);
export default Skill;
