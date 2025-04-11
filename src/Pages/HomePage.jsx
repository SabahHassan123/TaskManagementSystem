import React from 'react';
import './PageStyles.css';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
const navigate = useNavigate();

return (
    <div className="home-container">
    <h1 className="home-title">Welcome to Task Manager</h1>
    <p className="home-description mb-5 font-poppins">Organize, track, and complete your tasks efficiently.</p>
    <button className="home-cta-button" onClick={() => navigate('/dashboard')}>
        Go to Dashboard
    </button>
    </div>
);
};

export default HomePage;
