import React, { useEffect, useState } from 'react';
import useStore from '../../../store/userStore';

const ManageUsers = () => {
  const { users, admins, instructors, fetchUsers, promoteToAdmin, assignInstructorRole, deleteAdmin } = useStore();
  const [tab, setTab] = useState('students');

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div>
      <h2>Manage Users</h2>
      <div className="tabs">
        <button onClick={() => setTab('students')}>Students</button>
        <button onClick={() => setTab('instructors')}>Instructors</button>
        <button onClick={() => setTab('admins')}>Admins</button>
      </div>

      {tab === 'students' && (
        <div>
          <h3>Students</h3>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users
                .filter((user) => user.role === 'student')
                .map((user) => (
                  <tr key={user.id}>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>
                      <button onClick={() => promoteToAdmin(user.id)}>Promote to Admin</button>
                      <button onClick={() => assignInstructorRole(user.id)}>Assign as Instructor</button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      )}

      {tab === 'instructors' && (
        <div>
          <h3>Instructors</h3>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {instructors.map((instructor) => (
                <tr key={instructor.id}>
                  <td>{instructor.name}</td>
                  <td>{instructor.email}</td>
                  <td>
                    <button onClick={() => promoteToAdmin(instructor.id)}>Promote to Admin</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {tab === 'admins' && (
        <div>
          <h3>Admins</h3>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {admins.map((admin) => (
                <tr key={admin.id}>
                  <td>{admin.name}</td>
                  <td>{admin.email}</td>
                  <td>
                    <button onClick={() => deleteAdmin(admin.id)}>Remove Admin</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ManageUsers;
