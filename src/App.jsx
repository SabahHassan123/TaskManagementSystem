import React, { useState } from 'react';
import { FaTasks, FaPlus, FaSignOutAlt, FaUserCircle, FaSearch } from 'react-icons/fa';
import { MdDashboard } from "react-icons/md";
import { Link, Outlet } from 'react-router-dom';
import './App.css';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchQuery } from './Redux/Features/Tasks/SearchSlice';

const App = () => {
  const searchQuery = useSelector(state => state.search.searchQuery);
  const dispatch = useDispatch();

  const handleSearchChange = (e) => {
    dispatch(setSearchQuery(e.target.value));
  };

  return (
    <div className="page dashboard">
      {/* Sidebar */}
      <div className="sidebar">
        <h1>Dashboard</h1>
        <div className="sidebar-nav">
          <ul className="space-y-2">
            <li>
              <Link to="/dashboard/dashboardCategory" className="sidebar-link font-semibold hover:bg-violet-600 hover:text-white">
                <MdDashboard className='text-xl' /> Dashboard
              </Link>
            </li>
            <li>
              <Link to="/dashboard/tasksList" className="sidebar-link font-semibold hover:bg-violet-600 hover:text-white">
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
      <div className='w-full'>
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
                      value={searchQuery}
                      onChange={handleSearchChange}
                    />
                </div>
            </div>
            <Outlet />
        </div>
        
    </div>
    </div>
  );
};

export default App;
