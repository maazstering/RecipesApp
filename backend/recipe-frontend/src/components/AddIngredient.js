import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function AddIngredient() {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const navigate = useNavigate();
    const token = localStorage.getItem('token'); 


    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const ingredient = { name, description };
            await axios.post('http://localhost:5000/ingredient', ingredient,
            {
                headers: {
                    'Authorization': 'Bearer ' + token
                },
            }
        );
            navigate('/recipes'); 
        } catch (error) {
            console.error('Failed to add ingredient:', error.response.data);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h1>Add New Ingredient</h1>
            <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ingredient Name"
                required
            />
            <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Description"
                required
            />
            <button type="submit">Add Ingredient</button>
        </form>
    );
}

export default AddIngredient;
