
import React, { useEffect } from 'react';
import useStore from '../../../store/userStore';
import RoleChangeModal from './RoleChangeModal';

const UserTable = () => {
  const { users, fetchUsers } = useStore();
  const [selectedUser, setSelectedUser] = React.useState(null);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  return (
    <div>
      <h2>Manage Users</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>
                <button onClick={() => setSelectedUser(user)}>Change Role</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {selectedUser && (
        <RoleChangeModal user={selectedUser} onClose={() => setSelectedUser(null)} />
      )}
    </div>
  );
};

export default UserTable;



