// RoleChangeModal.jsx
import React, { useState } from 'react';
import useStore from '../../../store/userStore';

const RoleChangeModal = ({ user, onClose }) => {
  const { promoteToAdmin, assignInstructorRole } = useStore();
  const [newRole, setNewRole] = useState(user.role);

  const handleRoleChange = async () => {
    if (newRole === 'admin') await promoteToAdmin(user.id);
    if (newRole === 'instructor') await assignInstructorRole(user.id);
    onClose();
  };

  return (
    <div className="modal">
      <h3>Change Role for {user.name}</h3>
      <select value={newRole} onChange={(e) => setNewRole(e.target.value)}>
        <option value="student">Student</option>
        <option value="instructor">Instructor</option>
        <option value="admin">Admin</option>
      </select>
      <button onClick={handleRoleChange}>Save</button>
      <button onClick={onClose}>Cancel</button>
    </div>
  );
};

export default RoleChangeModal;