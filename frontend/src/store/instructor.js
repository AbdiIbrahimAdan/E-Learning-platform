import { create } from "zustand";
import axios from "axios";

const useInstructorStore = create((set) => ({
  courses: [],
  fetchCourses: async (instructorId) => {
    const { data } = await axios.get(`/api/instructor/courses/${instructorId}`);
    set({ courses: data });
  },

  createCourse: async (courseData) => {
    const { data } = await axios.post("/api/instructor/course", courseData);
    set((state) => ({ courses: [...state.courses, data] }));
  },

  addTopic: async (topicData) => {
    await axios.post("/api/instructor/course/topic", topicData);
  },

  addQuiz: async (quizData) => {
    await axios.post("/api/instructor/course/quiz", quizData);
  },

  addAssignment: async (assignmentData) => {
    await axios.post("/api/instructor/course/assignment", assignmentData);
  },
}));

export default useInstructorStore;
