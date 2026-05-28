import mongoose from 'mongoose';

const certificationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add certification name'],
    trim: true
  },
  issuer: {
    type: String,
    required: [true, 'Please add issuer name'],
    trim: true
  },
  date: {
    type: String,
    required: [true, 'Please add issue date'],
    trim: true
  },
  credentialId: {
    type: String,
    default: ''
  },
  credentialUrl: {
    type: String,
    default: ''
  }
}, { timestamps: true });

const Certification = mongoose.model('Certification', certificationSchema);
export default Certification;
