import React, { useEffect, useState } from 'react';
import './Superadmin-Dashboard.css';
import CoursesList from './Course/CoursesList';

import ManageUsers from '../Dashboard/ManageUser/ManageUsers';
import useUserStore from '../../store/userStore';

import AnalyticsUsers  from  '../Dashboard/Analytics/AnalyticsUsers';

const SuperadminDashboard = () => {
  const { stats, fetchUsers, fetchBooks } = useUserStore();
  const [activeSection, setActiveSection] = useState('welcome');

  useEffect(() => {
    fetchUsers();
    fetchBooks();
  }, [fetchUsers, fetchBooks]);

  const renderContent = () => {
    switch (activeSection) {
      case 'coursesList':
        return <CoursesList />;
      
      case 'manageUsers':
        return <ManageUsers />;
    
      case 'useranalytics':
        return <AnalyticsUsers/>;
      default:
        return (
          <div className="welcome-section">
            <h2>Welcome, Admin!</h2>
            <div className="stats">
              <p>Total Courses: {stats.books}</p>
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
        <button onClick={() => setActiveSection('coursesList')}>Course List</button>
       
        <button onClick={() => setActiveSection('manageUsers')}>Manage Users</button>
        
        <button onClick={() => setActiveSection('useranalytics')}>UserAnalytics</button> 
      </div>

      {/* Main Content */}
      <div className="main-content">{renderContent()}</div>
    </div>
  );
};

export default SuperadminDashboard;
