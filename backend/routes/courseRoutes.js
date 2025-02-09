import express from 'express';
import { createCourse, getAllCourses, enrollInCourse, getEnrolledCourses } from '../controllers/courseController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', protect, createCourse); // Instructor creates a course
router.get('/', getAllCourses); // Get all courses
router.post('/enroll', protect, enrollInCourse); // Students enroll in a course
router.get('/my-courses', protect, getEnrolledCourses); // Get student enrolled courses

export default router;
