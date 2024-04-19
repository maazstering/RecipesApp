import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function AddRecipe() {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [ingredients, setIngredients] = useState([]);
    const [allIngredients, setAllIngredients] = useState([]);
    const [file, setFile] = useState(null); // State to hold the uploaded file
    const navigate = useNavigate();
    const token = localStorage.getItem('token');

    useEffect(() => {
        const fetchIngredients = async () => {
            try {
                const response = await axios.get('http://localhost:5000/ingredients', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                setAllIngredients(response.data);
            } catch (error) {
                console.error('Error fetching ingredients:', error.response);
            }
        };
        fetchIngredients();
    }, [token]);

    const handleFileChange = (event) => {
        setFile(event.target.files[0]); // Update the state with the selected file
    };

    const handleFileSubmit = async (event) => {
        event.preventDefault();
        if (!file) {
            alert('Please select a file to upload.');
            return;
        }
        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await axios.post('http://localhost:5000/recipe/upload', formData, {
                headers: {
                    'Authorization': 'Bearer ' + token,
                    'Content-Type': 'multipart/form-data'
                }
            });
            alert('Recipes uploaded successfully');
            navigate('/recipes');
        } catch (error) {
            console.error('Failed to upload recipes:', error.response.data);
            alert('Failed to upload recipes');
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const recipe = { name, description, ingredients };
            await axios.post('http://localhost:5000/recipe', recipe, {
                headers: {
                    'Authorization': 'Bearer ' + token
                },
            });
            navigate('/recipes'); 
        } catch (error) {
            console.error('Failed to add recipe:', error.response.data);
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <h1>Add New Recipe</h1>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="name"
                    required
                />
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="description"
                    required
                />
                <select
                    multiple
                    value={ingredients}
                    onChange={(e) => setIngredients([...e.target.selectedOptions].map(option => option.value))}
                    required
                >
                    {allIngredients.map((ingredient) => (
                        <option key={ingredient._id} value={ingredient._id}>
                            {ingredient.name}
                        </option>
                    ))}
                </select>
                <button type="submit">Add Recipe</button>
            </form>
            <div>
                <h2>Or Upload Recipes via CSV</h2>
                <form onSubmit={handleFileSubmit}>
                    <input type="file" onChange={handleFileChange} accept=".csv" />
                    <button type="submit">Upload CSV</button>
                </form>
            </div>
        </div>
    );
}

export default AddRecipe;
