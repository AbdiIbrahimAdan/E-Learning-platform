import { useState, useEffect } from "react";

const ProgressTracking = () => {
  const [progress, setProgress] = useState([]);

  useEffect(() => {
    fetch("/api/instructor/progress")
      .then(res => res.json())
      .then(data => setProgress(data));
  }, []);

  return (
    <div>
      <h2>Student Progress</h2>
      <ul>
        {progress.map(student => (
          <li key={student._id}>
            {student.name}: {student.progress}%
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProgressTracking;
