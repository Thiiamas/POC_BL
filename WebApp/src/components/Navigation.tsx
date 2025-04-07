import React from 'react';
import { Link } from 'react-router-dom';
import './Navigation.css';

const Navigation: React.FC = () => {
    return (
        <nav className="navigation">
            <div className="nav-container">
                <Link to="/" className="nav-link">Home</Link>
                <Link to="/games" className="nav-link">Games</Link>
                <Link to="/filterGroups" className="nav-link">Filter Groups</Link>
            </div>
        </nav>
    );
};

export default Navigation; 