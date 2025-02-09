import mongoose from 'mongoose';

const courseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  instructor: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Instructor Reference
  category: { type: String, required: true },
  imageUrl: { type: String }, // Cloudinary Image Upload
  videoUrl: { type: String }, // Video Upload (if needed)
  enrolledStudents: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }], // Student enrollments
  createdAt: { type: Date, default: Date.now },
});

const Course = mongoose.model('Course', courseSchema);

export default Course;
