import React, { useEffect, useState } from "react";
import "./Superadmin_Dashboard.css";
import CoursesList from "./Course/CoursesList";
import ManageUsers from "../Super_Admin/ManageUser/ManageUsers.jsx";
import AnalyticsUsers from "./Analytics/AnalyticsUsers";
import useUserStore from "../../store/userStore";
import UserTable from "../Super_Admin/ManageUser/UserTable.jsx";
import RoleChangeModal from "../Super_Admin/ManageUser/RoleChangeModal.jsx";
import CreateAdmin from "../Super_Admin/ManageUser/CreateAdmin.jsx";

const Superadmin_Dashboard = () => {
  const { stats = {}, fetchUsers, fetchStats } = useUserStore(); // Default value for stats
  const [activeSection, setActiveSection] = useState("dashboard");

  useEffect(() => {
    fetchUsers();
    fetchStats();
  }, [fetchUsers, fetchStats]);

  const renderContent = () => {
    if (!stats) {
      return <p>Loading stats...</p>;
    }

    switch (activeSection) {
      case "coursesList":
        return <CoursesList />;
      case "manageUsers":
        return (
          <div>
            <ManageUsers />
            <UserTable />
            <CreateAdmin />
            <RoleChangeModal/>
          </div>
        );
      case "useranalytics":
        return <AnalyticsUsers />;
      default:
        return (
          <div className="dashboard-overview">
            <h2>Dashboard Overview</h2>
            <div className="stats-grid">
              <div className="stat-card">
                <h3>Total Users</h3>
                <p>{stats?.users ?? "Loading..."}</p>
              </div>
              <div className="stat-card">
                <h3>Total Courses</h3>
                <p>{stats?.courses ?? "Loading..."}</p>
              </div>
              <div className="stat-card">
                <h3>Active Instructors</h3>
                <p>{stats?.instructors ?? "Loading..."}</p>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="dashboard-container">
      <aside className="sidebar">
        <h2>Super Admin</h2>
        <nav>
          <button onClick={() => setActiveSection("dashboard")}>Dashboard</button>
          <button onClick={() => setActiveSection("coursesList")}>Course List</button>
          <button onClick={() => setActiveSection("manageUsers")}>Manage Users</button>
          <button onClick={() => setActiveSection("useranalytics")}>User Analytics</button>
        </nav>
      </aside>

      <main className="main-content">{renderContent()}</main>
    </div>
  );
};

export default Superadmin_Dashboard;
