import React, { useEffect, useState } from 'react';
import './InstructorDashboard.css';
import ManageCourses from '../Instructor/ManageCourses/ManageCourses';
import AddCourse from './ManageCourses/AddCourse';
import ProgressTracking from '../Instructor/ProgressTracking/ProgressTracking';
import useUserStore from '../../store/User'
import Notifications from '../Instructor/Notifications/Notifications'; 
import Messages  from  '../Instructor/Messages/Messages';
import EnrolledStudents from '../Instructor/Enrollment/EnrolledStudents';

const InstructorDashboard = () => {
  const { stats, fetchUsers } = useUserStore();
  const [activeSection, setActiveSection] = useState('welcome');

  useEffect(() => {
    fetchUsers();
    
  }, [fetchUsers]);

  const renderContent = () => {
    switch (activeSection) {
      case 'addCourse':
        return <AddCourse />; 
      case 'manageCourses':
        return <ManageCourses />;
      case 'enrolledStudents':
        return <EnrolledStudents/>;
      case 'progressTracking':
        return <ProgressTracking />;
      case 'notifications':
        return <Notifications />; 
      case 'messages':
        return <Messages/>;
      default:
        return (
          <div className="welcome-section">
            <h2>Welcome, Instructor!</h2>
            <div className="stats">
              {/* <p>Total Course: {stats.course}</p> */}
              <p>Total Users: {stats.users}</p>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="dashboard">
      {/* Sidebar */}
      <div className="sidebar">
        <button onClick={() => setActiveSection('welcome')}>Dashboard</button>
        <button onClick={() => setActiveSection('addCourse')}>Add Course</button>
        <button onClick={() => setActiveSection('manageCourses')}>ManageCourses</button>
        <button onClick={() => setActiveSection('enrolledStudents')}>EnrolledStudents</button>
        <button onClick={() => setActiveSection('progressTracking')}>ProgressTracking</button>
        <button onClick={() => setActiveSection('notifications')}>Notifications</button> 
        <button onClick={() => setActiveSection('messages')}>Messages</button> 
      </div>

      <div className="main-content">{renderContent()}</div>
    </div>
  );
};

export default InstructorDashboard;
