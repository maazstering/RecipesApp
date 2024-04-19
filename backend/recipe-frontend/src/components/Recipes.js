import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Recipes() {
    const [recipes, setRecipes] = useState([]);
    const navigate = useNavigate();
    const userRole = localStorage.getItem('userRole'); 
    
    useEffect(() => {
        const fetchRecipes = async () => {
            try {
                const response = await axios.get('http://localhost:5000/recipes');
                setRecipes(response.data);
            } catch (error) {
                console.error('Error fetching recipes:', error);
            }
        };

        fetchRecipes();
    }, []);

    const handleRecipeClick = (id) => {
        navigate(`/recipe/${id}`);
    };

    return (
        <div>
            <h1>Recipes</h1>
            {userRole === 'admin' && (
                <div>
                    <button onClick={() => navigate('/add-ingredient')}>Add Ingredient</button>
                    <button onClick={() => navigate('/add-recipe')}>Add Recipe</button>
                </div>
            )}
            <ul>
                {recipes.map(recipe => (
                    <li key={recipe._id} onClick={() => handleRecipeClick(recipe._id)} style={{ cursor: 'pointer' }}>
                        {recipe.name} - {recipe.description}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Recipes;
