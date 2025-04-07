import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MusicDTO } from '../types/music';
import { FilterDTO } from '../types/filter';
import './FilterEditor.css';

const FilterEditor: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [musicList, setMusicList] = useState<MusicDTO[]>([]);
    const [selectedFilters, setSelectedFilters] = useState<FilterDTO[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchMusic();
    }, [selectedFilters]);

    const fetchMusic = async () => {
        try {
            const response = await fetch('https://localhost:7231/Music/filtered', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(selectedFilters)
            });

            if (!response.ok) {
                throw new Error('Failed to fetch music');
            }

            const data = await response.json();
            console.log('API Response:', data);
            setMusicList(data);
            setLoading(false);
        } catch (err) {
            console.error('Error fetching music:', err);
            setError(err instanceof Error ? err.message : 'An error occurred while fetching music');
            setLoading(false);
        }
    };

    const handleFilterClick = (filter: FilterDTO) => {
        setSelectedFilters(prev => {
            const exists = prev.some(f => f.Name === filter.Name && f.Value === filter.Value);
            if (exists) {
                return prev.filter(f => !(f.Name === filter.Name && f.Value === filter.Value));
            }
            return [...prev, filter];
        });
    };

    if (loading) {
        return <div className="filter-editor-loading">Loading...</div>;
    }

    if (error) {
        return (
            <div className="filter-editor-error">
                <h2>Error</h2>
                <p>{error}</p>
            </div>
        );
    }

    console.log('Current musicList:', musicList);

    return (
        <div className="filter-editor-container">
            <h1>Filter Editor</h1>
            <div className="filter-editor-content">
                <div className="music-list-section">
                    <h2>Music List</h2>
                    <div className="music-grid">
                        {musicList.map((music, index) => (
                            <div key={index} className="music-card">
                                <h3>{music.music}</h3>
                                <p>Game: {music.game}</p>
                                <p>Console: {music.console}</p>
                                <p>Release Date: {music.releaseDate}</p>
                                {music.flag && <p className="flag">Flag: {music.flag}</p>}
                            </div>
                        ))}
                    </div>
                </div>
                <div className="filters-section">
                    <h2>Available Filters</h2>
                    <div className="filters-grid">
                        {[
                            { Name: "Game", Value: "Super Mario World" },
                            { Name: "Game", Value: "The Legend of Zelda" },
                            { Name: "Game", Value: "Metroid" },
                            { Name: "Console", Value: "SNES" },
                            { Name: "Console", Value: "NES" },
                            { Name: "Console", Value: "Game Boy" },
                            { Name: "Year", Value: "1990" },
                            { Name: "Year", Value: "1991" },
                            { Name: "Year", Value: "1992" }
                        ].map((filter, index) => (
                            <div
                                key={index}
                                className={`filter-box ${selectedFilters.some(f => f.Name === filter.Name && f.Value === filter.Value) ? 'selected' : ''}`}
                                onClick={() => handleFilterClick(filter)}
                            >
                                <h3>{filter.Name}</h3>
                                <p>{filter.Value}</p>
                            </div>
                        ))}
                    </div>
                    <div className="selected-filters">
                        <h3>Selected Filters:</h3>
                        {selectedFilters.map((filter, index) => (
                            <div key={index} className="selected-filter">
                                {filter.Name}: {filter.Value}
                            </div>
                        ))}
                    </div>
                    <button onClick={() => navigate(`/editFilterGroup/${id}`)} className="back-button">
                        Back to Filter Group
                    </button>
                </div>
            </div>
        </div>
    );
};

export default FilterEditor; 