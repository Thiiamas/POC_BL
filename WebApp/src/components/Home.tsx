import React from 'react';
import './Home.css';

const Home: React.FC = () => {
    return (
        <div className="home-container">
            <h1>Welcome to Our Gaming Platform</h1>
            <p>Discover and explore our collection of amazing games!</p>
            <div className="placeholder">
                <h2>Featured Content Coming Soon</h2>
                <p>Stay tuned for exciting updates and new features!</p>
            </div>
        </div>
    );
};

export default Home; 