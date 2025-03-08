import Course from "../models/Course.js";

// Create a New Course
export const createCourse = async (req, res) => {
    try {
      const { title, description, instructorId } = req.body;
      
      // Ensure the file was uploaded
      const imageUrl = req.file ? req.file.path : null;
  
      const course = new Course({
        title,
        description,
        imageUrl,  // Store the Cloudinary image URL
        instructor: instructorId,
        topics: [],
        assignments: [],
        quizzes: [],
        exams: [],
      });
  
      await course.save();
      res.status(201).json(course);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error creating course" });
    }
  };
  
// Add a Topic to a Course
export const addTopic = async (req, res) => {
  try {
    const { courseId, title, content, videoUrl } = req.body;
    const course = await Course.findById(courseId);
    
    if (!course) return res.status(404).json({ error: "Course not found" });

    course.topics.push({ title, content, videoUrl });
    await course.save();

    res.status(200).json(course);
  } catch (error) {
    res.status(500).json({ error: "Error adding topic" });
  }
};

// Add a Quiz to a Course
export const addQuiz = async (req, res) => {
  try {
    const { courseId, title, questions } = req.body;
    const course = await Course.findById(courseId);

    if (!course) return res.status(404).json({ error: "Course not found" });

    course.quizzes.push({ title, questions });
    await course.save();

    res.status(200).json(course);
  } catch (error) {
    res.status(500).json({ error: "Error adding quiz" });
  }
};

// Add an Assignment to a Course
export const addAssignment = async (req, res) => {
  try {
    const { courseId, title, description, fileUrl, dueDate } = req.body;
    const course = await Course.findById(courseId);

    if (!course) return res.status(404).json({ error: "Course not found" });

    course.assignments.push({ title, description, fileUrl, dueDate });
    await course.save();

    res.status(200).json(course);
  } catch (error) {
    res.status(500).json({ error: "Error adding assignment" });
  }
};
