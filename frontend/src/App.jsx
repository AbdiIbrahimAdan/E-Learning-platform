import React from 'react';
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Home from './pages/Home/Home';
import About from './pages/About/About';
import Courses from './pages/Courses';
import Footer from './components/Footer/Footer'
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import PrivateRoute from './components/PrivateRoute';
import Superadmin_Dashboard from './components/Super_Admin/Superadmin_Dashboard';
import Dashboard from './components/Dashboard/Dashboard'; 
import InstructorDashboard from './pages/Instructor/InstructorDashboard';
import Student_Dashboard from './pages/Student/Student_Dashboard'
import NotFound from './pages/NotFound';

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        
        <Route element={<PrivateRoute />}>
          <Route path="/dashboard/*" element={<Dashboard />} />
        </Route>

        <Route element={<PrivateRoute />}>
          <Route path="/superadmin_dashboard/*" element={<Superadmin_Dashboard />} />
        </Route>

        <Route element={<PrivateRoute />}>
          <Route path="/instructor/*" element={<InstructorDashboard />} />
        </Route>

        <Route element={<PrivateRoute />}>
          <Route path="/student_dashboard/*" element={<Student_Dashboard />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer/>
    </Router>
  );
};

export default App;
