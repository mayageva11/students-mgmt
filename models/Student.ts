import mongoose from 'mongoose';

const StudentSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  birthDate: {
    type: Date,
    required: true
  },
  grade: {
    type: Number,
    required: true
  },
  description: String
});

export default mongoose.models.Student ||
  mongoose.model('Student', StudentSchema);
