import React, { useEffect, useState } from 'react';
import '../Instructor/InstructorDashboard.css';
import EnrolledCourses from '../Student/Courses/EnrolledCourses';
import useUserStore from '../../store/userStore';
import Notifications from '../Instructor/Notifications/Notifications'; 
import Messages  from  '../Instructor/Messages/Messages';
const Student_Dashboard = () => {
  const { stats, fetchUsers, fetchBooks } = useUserStore();
  const [activeSection, setActiveSection] = useState('welcome');

  useEffect(() => {
    fetchUsers();
    fetchBooks();
  }, [fetchUsers, fetchBooks]);

  const renderContent = () => {
    switch (activeSection) {
      case 'enrolledCourses':
        return <EnrolledCourses/>;
      case 'notifications':
        return <Notifications />; 
      case 'messages':
        return <Messages/>;
      default:
        return (
          <div className="welcome-section">
            <h2>Welcome, Instructor!</h2>
            <div className="stats">
              
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
        
        <button onClick={() => setActiveSection('enrolledCourses')}>EnrolledCourses</button>
        <button onClick={() => setActiveSection('notifications')}>Notifications</button> 
        <button onClick={() => setActiveSection('messages')}>Messages</button> 
      </div>

      <div className="main-content">{renderContent()}</div>
    </div>
  );
};

export default Student_Dashboard;
