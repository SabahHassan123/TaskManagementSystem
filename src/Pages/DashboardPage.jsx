import React, { useState } from 'react';
import { FaTasks, FaPlus, FaSignOutAlt, FaUserCircle, FaSearch } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import './PageStyles.css';

const DashboardPage = () => {
  const [tasks, setTasks] = useState([
    { id: 1, title: 'Design homepage', status: 'To-Do', due: 'Today' },
    { id: 2, title: 'Implement dashboard', status: 'In Progress', due: 'Tomorrow' },
    { id: 3, title: 'Fix bugs in login', status: 'Completed', due: 'This week' },
  ]);

  const statusGroups = ['To-Do', 'In Progress', 'Completed'];

  const handleAddTask = (status) => {
    const title = prompt(`Enter new task for "${status}"`);
    if (title) {
      const newTask = {
        id: tasks.length + 1,
        title,
        status,
        due: 'Later',
      };
      setTasks([...tasks, newTask]);
    }
  };

  return (
    <div className="page dashboard">
      {/* Sidebar */}
      <div className="sidebar">
        <h1>Dashboard</h1>
        <div className="sidebar-nav">
          <ul className="space-y-2">
            <li>
              <Link to="/tasks" className="sidebar-link">
                <FaTasks /> My Tasks
              </Link>
            </li>
          </ul>
        </div>
        <div className="bottom-links">
          <Link to="/login" className="sidebar-link">
            <FaSignOutAlt /> Logout
          </Link>
        </div>
      </div>

      {/* Right Section: Navbar + Content */}
      <div className="main-area">
        {/* Top Navbar */}
        <div className="navbar">
          <div className="search-container">
            <FaSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search tasks..."
              className="search-input"
            />
          </div>
          <div className="profile-icon">
            <FaUserCircle size={28} />
          </div>
        </div>

        {/* Dashboard Content */}
        <div className="dashboard-content">
          {statusGroups.map((status) => (
            <div key={status} className="widget">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-semibold flex items-center gap-2">
                  <FaTasks /> {status}
                </h3>
                <button
                  className="text-sm bg-yellow-300 hover:bg-yellow-400 text-black px-2 py-1 rounded flex items-center gap-1"
                  onClick={() => handleAddTask(status)}
                >
                  <FaPlus /> Add
                </button>
              </div>
              <ul className="space-y-2">
                {tasks
                  .filter((t) => t.status === status)
                  .map((task) => (
                    <li key={task.id} className="task-item">
                      <div>{task.title}</div>
                      <div className="status">{task.due}</div>
                    </li>
                  ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
