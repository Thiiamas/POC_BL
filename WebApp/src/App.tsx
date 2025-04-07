import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Navigation from './components/Navigation';
import Home from './components/Home';
import GamesList from './components/GamesList';
import FilterGroupsList from './components/FilterGroupsList';
import EditFilterGroup from './components/EditFilterGroup';
import FilterEditor from './components/FilterEditor';

const App: React.FC = () => {
    return (
        <Router>
            <div className="app">
                <Navigation />
                <main className="main-content">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/games" element={<GamesList />} />
                        <Route path="/filterGroups" element={<FilterGroupsList />} />
                        <Route path="/editFilterGroup/:id" element={<EditFilterGroup />} />
                        <Route path="/filterEditor/:id" element={<FilterEditor />} />
                        <Route path="/createFilterGroup" element={<div>Create Filter Group Page (Coming Soon)</div>} />
                    </Routes>
                </main>
            </div>
        </Router>
    );
};

export default App; 