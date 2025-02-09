import { useState, useEffect } from "react";

const ManageCourses = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    // Fetch instructor's courses from the backend
    fetch("/api/instructor/courses")
      .then(res => res.json())
      .then(data => setCourses(data));
  }, []);

  return (
    <div>
      <h2>Manage Your Courses</h2>
      <button>Add New Course</button>
      <ul>
        {courses.map(course => (
          <li key={course._id}>
            {course.title} - {course.students.length} students
            <button>Edit</button>
            <button>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ManageCourses;
