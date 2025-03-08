import express from "express";
import {
  createCourse,
  addTopic,
  addQuiz,
  addAssignment,
} from "../controllers/instructorController.js";
import { protect, instructorOnly } from "../middleware/authMiddleware.js";
import { upload } from "../utils/cloudinaryConfig.js"; // Import multer upload config

const router = express.Router();

// 🔹 Create a Course with Image Upload (Instructor Only)
router.post("/course", protect, instructorOnly, upload.single("image"), createCourse);

// 🔹 Add a Topic to a Course
router.post("/course/topic", protect, instructorOnly, addTopic);

// 🔹 Add a Quiz to a Course
router.post("/course/quiz", protect, instructorOnly, addQuiz);

// 🔹 Add an Assignment to a Course
router.post("/course/assignment", protect, instructorOnly, addAssignment);

export default router;
