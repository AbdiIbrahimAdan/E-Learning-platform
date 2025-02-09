import Course from '../models/Course.js';
import Enrollment from '../models/Enrollment.js';

// Create a new course (Instructor Only)
export const createCourse = async (req, res) => {
  try {
    const { title, description, category, imageUrl, videoUrl } = req.body;
    const instructor = req.user.id;

    if (req.user.role !== 'Instructor') {
      return res.status(403).json({ message: 'Only instructors can create courses' });
    }

    const course = new Course({
      title,
      description,
      instructor,
      category,
      imageUrl,
      videoUrl,
    });

    await course.save();
    res.status(201).json(course);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all courses
export const getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find().populate('instructor', 'name email');
    res.status(200).json(courses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Enroll a student in a course
export const enrollInCourse = async (req, res) => {
  try {
    const { courseId } = req.body;
    const studentId = req.user.id;

    const course = await Course.findById(courseId);
    if (!course) return res.status(404).json({ message: 'Course not found' });

    const enrollment = new Enrollment({ student: studentId, course: courseId });
    await enrollment.save();

    course.enrolledStudents.push(studentId);
    await course.save();

    res.status(201).json({ message: 'Enrollment successful' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get enrolled courses for a student
export const getEnrolledCourses = async (req, res) => {
  try {
    const enrollments = await Enrollment.find({ student: req.user.id }).populate('course');
    res.status(200).json(enrollments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
