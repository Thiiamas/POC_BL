import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FilterGroup } from '../types/filterGroup';
import './EditFilterGroup.css';

const EditFilterGroup: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [filterGroup, setFilterGroup] = useState<FilterGroup | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchFilterGroup();
    }, [id]);

    const fetchFilterGroup = async () => {
        try {
            const response = await fetch(`https://localhost:7231/Music/filterGroups/${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error('Failed to fetch filter group');
            }

            const data = await response.json();
            setFilterGroup(data);
            setLoading(false);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred while fetching filter group');
            setLoading(false);
        }
    };

    if (loading) {
        return <div className="edit-loading">Loading filter group...</div>;
    }

    if (error) {
        return (
            <div className="edit-error">
                <h2>Error</h2>
                <p>{error}</p>
            </div>
        );
    }

    return (
        <div className="edit-container">
            <h1>Edit Filter Group</h1>
            <div className="edit-form">
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input
                        type="text"
                        id="name"
                        value={filterGroup?.name || ''}
                        readOnly
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <textarea
                        id="description"
                        value={filterGroup?.description || ''}
                        readOnly
                    />
                </div>
                <div className="button-group">
                    <button onClick={() => navigate('/filterGroups')} className="back-button">
                        Back to Filter Groups
                    </button>
                    <button
                        onClick={() => navigate(`/filterEditor/${id}`)}
                        className="add-filters-button"
                    >
                        Add Filters
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EditFilterGroup; 