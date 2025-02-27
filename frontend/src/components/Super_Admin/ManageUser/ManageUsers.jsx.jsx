// import { useEffect, useState } from "react";
// import axios from "axios";
// import { useSuperAdminStore } from "../store/superAdminStore";


// const ManageUsers = () => {
//   const { admins, instructors, students, fetchUsers, deleteAdmin, changeRole, addAdmin } = useSuperAdminStore();
//   const [newAdmin, setNewAdmin] = useState({ name: "", email: "", password: "" });

//   useEffect(() => {
//     fetchUsers();
//   }, [fetchUsers]);

//   return (
//     <div className="superadmin-container">
//       <h1>SuperAdmin Dashboard</h1>
//       <div className="tables-container">
//         <UserTable title="Admins" users={admins} onDelete={deleteAdmin} onChangeRole={changeRole} />
//         <UserTable title="Instructors" users={instructors} onChangeRole={changeRole} />
//         <UserTable title="Students" users={students} onChangeRole={changeRole} />
//       </div>
//       <div className="add-admin">
//         <h2>Add New Admin</h2>
//         <input type="text" placeholder="Name" value={newAdmin.name} onChange={(e) => setNewAdmin({ ...newAdmin, name: e.target.value })} />
//         <input type="email" placeholder="Email" value={newAdmin.email} onChange={(e) => setNewAdmin({ ...newAdmin, email: e.target.value })} />
//         <input type="password" placeholder="Password" value={newAdmin.password} onChange={(e) => setNewAdmin({ ...newAdmin, password: e.target.value })} />
//         <button onClick={() => addAdmin(newAdmin)}>Add Admin</button>
//       </div>
//     </div>
//   );
// };

// const UserTable = ({ title, users, onDelete, onChangeRole }) => (
//   <div className="user-table">
//     <h2>{title}</h2>
//     <table>
//       <thead>
//         <tr>
//           <th>Name</th>
//           <th>Email</th>
//           <th>Role</th>
//           <th>Actions</th>
//         </tr>
//       </thead>
//       <tbody>
//         {users.map((user) => (
//           <tr key={user.id}>
//             <td>{user.name}</td>
//             <td>{user.email}</td>
//             <td>{user.role}</td>
//             <td>
//               {onDelete && <button onClick={() => onDelete(user.id)}>Delete</button>}
//               {onChangeRole && (
//                 <select onChange={(e) => onChangeRole(user.id, e.target.value)}>
//                   <option value="">Change Role</option>
//                   <option value="student">Student</option>
//                   <option value="instructor">Instructor</option>
//                   <option value="admin">Admin</option>
//                 </select>
//               )}
//             </td>
//           </tr>
//         ))}
//       </tbody>
//     </table>
//   </div>
// );

// export default ManageUsers;
import React from 'react'

const ManageUsers = () => {
  return (
    <div>
      hello
    </div>
  )
}

export default ManageUsers.jsx
