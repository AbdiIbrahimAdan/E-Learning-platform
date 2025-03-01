// CreateAdmin.jsx
import React, { useState } from 'react';
import useStore from '../../../store/userStore';

const CreateAdmin = () => {
  const [email, setEmail] = useState('');
  const { promoteToAdmin } = useStore();

  const handleCreateAdmin = async () => {
    if (email) {
      await promoteToAdmin(email);
      setEmail('');
    }
  };

  return (
    <div>
      <h2>Create New Admin</h2>
      <input
        type="email"
        placeholder="Enter user email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button onClick={handleCreateAdmin}>Make Admin</button>
    </div>
  );
};

export default CreateAdmin;
