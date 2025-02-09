import { useState, useEffect } from "react";

const EnrolledStudents = () => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    fetch("/api/instructor/students")
      .then(res => res.json())
      .then(data => setStudents(data));
  }, []);

  return (
    <div>
      <h2>Enrolled Students</h2>
      <ul>
        {students.map(student => (
          <li key={student._id}>
            {student.name} - {student.email}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EnrolledStudents;
