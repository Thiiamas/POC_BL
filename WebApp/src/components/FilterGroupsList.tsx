import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FilterGroup } from '../types/filterGroup';
import './FilterGroupsList.css';

const FilterGroupsList: React.FC = () => {
    const [filterGroups, setFilterGroups] = useState<FilterGroup[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchFilterGroups();
    }, []);

    const fetchFilterGroups = async () => {
        try {
            const response = await fetch('https://localhost:7231/Music/filterGroups', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error('Failed to fetch filter groups');
            }

            const data = await response.json();
            setFilterGroups(data);
            setLoading(false);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred while fetching filter groups');
            setLoading(false);
        }
    };

    if (loading) {
        return <div className="filter-groups-loading">Loading filter groups...</div>;
    }

    if (error) {
        return (
            <div className="filter-groups-error">
                <h2>Error</h2>
                <p>{error}</p>
            </div>
        );
    }

    return (
        <div className="filter-groups-container">
            <h1>Filter Groups</h1>
            <div className="filter-groups-grid">
                {filterGroups.map((group) => (
                    <Link to={`/editFilterGroup/${group.id}`} key={group.id} className="filter-group-card">
                        <h2>{group.name}</h2>
                        <p>{group.description}</p>
                    </Link>
                ))}
                <Link to="/createFilterGroup" className="filter-group-card create-card">
                    <h2>Create New Filter Group</h2>
                    <p>Click here to create a new filter group</p>
                </Link>
            </div>
        </div>
    );
};

export default FilterGroupsList; 