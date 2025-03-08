import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {jwtDecode} from 'jwt-decode';

const AddCourse = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [instructorId, setInstructorId] = useState(''); // New Field
  const [image, setImage] = useState(null);
  const [topics, setTopics] = useState([]);
  const [quizzes, setQuizzes] = useState([]);
  const [assignments, setAssignments] = useState([]);
  const [exams, setExams] = useState([]); // New Field
  const [loading, setLoading] = useState(false);
  

useEffect(() => {
    const token = localStorage.getItem('token');
    if (token){
        const decoded = jwtDecode(token);
        setInstructorId(decoded.id);
    }
}, [])

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      let imageUrl = '';
      if (image) {
        // Upload image to Cloudinary
        const formData = new FormData();
        formData.append('file', image);
        formData.append('upload_preset', 'course_upload'); // Change this to match your Cloudinary preset

        const uploadResponse = await axios.post(
          'https://api.cloudinary.com/v1_1/dgcsowpor/image/upload',
          formData
        );
        imageUrl = uploadResponse.data.secure_url;
      }

      // Prepare course data
      const newCourse = {
        title,
        description,
        instructorId,
        imageUrl,
        topics,
        quizzes,
        assignments,
        exams,
      };

      await axios.post('http://localhost:5000/api/instructor/courses/add', newCourse, {
        headers: {Authorization: `Bearer ${localStorage.getItem('token')}`},
      });

      // Reset form
      setTitle('');
      setDescription('');
      setInstructorId('');
      setImage(null);
      setTopics([]);
      setQuizzes([]);
      setAssignments([]);
      setExams([]);

      alert('Course added successfully!');
    } catch (error) {
      console.error('Failed to add course:', error.response?.data || error.message);
      alert('Error adding course, please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Dynamic input handlers
  const handleAddTopic = () => {
    setTopics([...topics, { title: '', content: '', videoUrl: '' }]);
  };

  const handleTopicChange = (index, field, value) => {
    const updatedTopics = [...topics];
    updatedTopics[index][field] = value;
    setTopics(updatedTopics);
  };

  const handleAddQuiz = () => {
    setQuizzes([...quizzes, { title: '', questions: '' }]);
  };

  const handleQuizChange = (index, field, value) => {
    const updatedQuizzes = [...quizzes];
    updatedQuizzes[index][field] = value;
    setQuizzes(updatedQuizzes);
  };

  const handleAddAssignment = () => {
    setAssignments([...assignments, { title: '', description: '', fileUrl: '', dueDate: '' }]);
  };

  const handleAssignmentChange = (index, field, value) => {
    const updatedAssignments = [...assignments];
    updatedAssignments[index][field] = value;
    setAssignments(updatedAssignments);
  };

  const handleAddExam = () => {
    setExams([...exams, { title: '', questions: '' }]);
  };

  const handleExamChange = (index, field, value) => {
    const updatedExams = [...exams];
    updatedExams[index][field] = value;
    setExams(updatedExams);
  };

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px', backgroundColor: '#f9f9f9', borderRadius: '8px' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Add Course</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '15px' }}>
          <label>Instructor ID</label>
          <input
            type="text"
            value={instructorId}
            onChange={(e) => setInstructorId(e.target.value)}
            required
            placeholder="Enter instructor ID"
            style={{ width: '100%', padding: '10px', borderRadius: '5px' }}
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label>Course Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            placeholder="Enter course title"
            style={{ width: '100%', padding: '10px', borderRadius: '5px' }}
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label>Course Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter course description"
            style={{ width: '100%', padding: '10px', borderRadius: '5px', height: '80px' }}
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label>Upload Course Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
            required
            style={{ width: '100%', padding: '10px' }}
          />
        </div>

        {/* Topics Section */}
        <div>
          <h3>Topics</h3>
          {topics.map((topic, index) => (
            <div key={index}>
              <input type="text" placeholder="Title" value={topic.title} onChange={(e) => handleTopicChange(index, 'title', e.target.value)} />
              <input type="text" placeholder="Content" value={topic.content} onChange={(e) => handleTopicChange(index, 'content', e.target.value)} />
              <input type="text" placeholder="Video URL" value={topic.videoUrl} onChange={(e) => handleTopicChange(index, 'videoUrl', e.target.value)} />
            </div>
          ))}
          <button type="button" onClick={handleAddTopic}>+ Add Topic</button>
        </div>

        {/* Quizzes Section */}
        <div>
          <h3>Quizzes</h3>
          {quizzes.map((quiz, index) => (
            <div key={index}>
              <input type="text" placeholder="Quiz Title" value={quiz.title} onChange={(e) => handleQuizChange(index, 'title', e.target.value)} />
              <input type="text" placeholder="Questions" value={quiz.questions} onChange={(e) => handleQuizChange(index, 'questions', e.target.value)} />
            </div>
          ))}
          <button type="button" onClick={handleAddQuiz}>+ Add Quiz</button>
        </div>

        {/* Assignments Section */}
        <div>
          <h3>Assignments</h3>
          {assignments.map((assignment, index) => (
            <div key={index}>
              <input type="text" placeholder="Assignment Title" value={assignment.title} onChange={(e) => handleAssignmentChange(index, 'title', e.target.value)} />
              <input type="text" placeholder="Description" value={assignment.description} onChange={(e) => handleAssignmentChange(index, 'description', e.target.value)} />
              <input type="text" placeholder="File URL" value={assignment.fileUrl} onChange={(e) => handleAssignmentChange(index, 'fileUrl', e.target.value)} />
              <input type="date" value={assignment.dueDate} onChange={(e) => handleAssignmentChange(index, 'dueDate', e.target.value)} />
            </div>
          ))}
          <button type="button" onClick={handleAddAssignment}>+ Add Assignment</button>
        </div>

        <button type="submit" disabled={loading} style={{ width: '100%', padding: '10px', backgroundColor: '#007bff', color: 'white', borderRadius: '5px', cursor: 'pointer' }}>
          {loading ? 'Uploading...' : 'Add Course'}
        </button>
      </form>
    </div>
  );
};

export default AddCourse;
