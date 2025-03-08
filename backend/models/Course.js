import mongoose from "mongoose";

const topicSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  videoUrl: { type: String }, // Optional video resource
});

const questionSchema = new mongoose.Schema({
  questionText: { type: String, required: true },
  options: {
    A: { type: String, required: true },
    B: { type: String, required: true },
    C: { type: String, required: true },
    D: { type: String, required: true },
  },
  correctAnswer: { type: String, enum: ["A", "B", "C", "D"], required: true },
});

const quizSchema = new mongoose.Schema({
  title: { type: String, required: true },
  questions: [questionSchema], // Array of questions
});

const assignmentSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  fileUrl: { type: String }, // If an instructor uploads an assignment file
  dueDate: { type: Date },
});

const examSchema = new mongoose.Schema({
  title: { type: String, required: true },
  questions: [questionSchema], // Same structure as quizzes
  passingScore: { type: Number, required: true },
});

const courseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  imageUrl: { type: String }, // Cover image for course
  instructor: { type: mongoose.Schema.Types.ObjectId, ref: "Instructor" },
  topics: [topicSchema], // List of topics
  assignments: [assignmentSchema], // Assignments linked to this course
  quizzes: [quizSchema], // Quizzes for students
  exams: [examSchema], // Final assessment
  studentsEnrolled: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  isCertified: { type: Boolean, default: false }, // If students get a certificate
  createdAt: { type: Date, default: Date.now },
});

const Course = mongoose.model("Course", courseSchema);
export default Course;
