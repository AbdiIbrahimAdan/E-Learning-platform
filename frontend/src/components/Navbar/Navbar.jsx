import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useUser } from '../../context/UserContext';
import { FaBars, FaTimes } from 'react-icons/fa';
import './Navbar.css'; 

const Navbar = () => {
  const { user, setUser } = useUser();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    setUser(null);
    navigate('/');
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav>
      <div className="menu-icon" onClick={toggleMenu}>
        {isMenuOpen ? <FaTimes /> : <FaBars />}
      </div>
      <ul className={isMenuOpen ? 'active' : ''}>
        <li><Link to="/" onClick={() => setIsMenuOpen(false)}>Home</Link></li>
        <li><Link to="/about" onClick={() => setIsMenuOpen(false)}>About</Link></li>
        <li><Link to="/courses" onClick={() => setIsMenuOpen(false)}>Courses</Link></li>
        
        
        {user && user.role === 'Admin' && (
          <li><Link to="/dashboard" onClick={() => setIsMenuOpen(false)}>Dashboard</Link></li>
        )}
        
        
        {user && user.role === 'SuperAdmin' && (
          <li><Link to="/superadmin_dashboard" onClick={() => setIsMenuOpen(false)}>Superadmin-Dashboard</Link></li>
        )}

        {user && user.role === 'Instructor' && (
          <li><Link to="/instructor" onClick={() => setIsMenuOpen(false)}>Instructor Dashboard</Link></li>
        )}
        {user && user.role === 'Student' && (
          <li><Link to="/student_dashboard" onClick={() => setIsMenuOpen(false)}>Student_Dashboard</Link></li>
        )}
        

        {!user ? (
          <>
            <li><Link to="/login" onClick={() => setIsMenuOpen(false)}>Login</Link></li>
            <li><Link to="/register" onClick={() => setIsMenuOpen(false)}>Register</Link></li>
          </>
        ) : (
          <li>
            <button onClick={handleLogout}>Logout</button>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
