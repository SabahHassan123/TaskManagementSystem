import React from 'react';
import '../Components/PagesStyles.css';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
    const navigate = useNavigate();
    
    return (
        <div className="home-container text-white">
        <h1 className="home-title">Welcome to Task Manager</h1>
        <p className="home-description mb-5 font-poppins text-gray-900 font-semibold">Organize, track, and complete your tasks efficiently.</p>
        <button className="home-cta-button bg-violet-600 text-white font-semibold font-poppins hover:bg-violet-500" onClick={() => navigate('/login')}>
            Go to Dashboard
        </button>
        </div>
    );
};

export default HomePage;
