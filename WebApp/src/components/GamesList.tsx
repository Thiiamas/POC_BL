import React, { useEffect, useState } from 'react';
import { Game } from '../types/game';
import './GamesList.css';

const GamesList: React.FC = () => {
    const [games, setGames] = useState<Game[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchGames();
    }, []);

    const fetchGames = async () => {
        try {
            const response = await fetch('https://localhost:7231/Music/games', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error('Failed to fetch games');
            }

            const data = await response.json();
            setGames(data);
            setLoading(false);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred while fetching games');
            setLoading(false);
        }
    };

    if (loading) {
        return <div className="games-loading">Loading games...</div>;
    }

    if (error) {
        return (
            <div className="games-error">
                <h2>Error</h2>
                <p>{error}</p>
            </div>
        );
    }

    return (
        <div className="games-container">
            <h1>Games List</h1>
            <div className="games-grid">
                {games.map((game, index) => (
                    <div key={index} className="game-card">
                        <h2>{game}</h2>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default GamesList;