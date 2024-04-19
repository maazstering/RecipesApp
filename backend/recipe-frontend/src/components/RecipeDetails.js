import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function RecipeDetails() {
    const { id } = useParams(); 
    const [recipe, setRecipe] = useState(null);

    useEffect(() => {
        const fetchRecipeDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/recipe/${id}`);
                setRecipe(response.data);
            } catch (error) {
                console.error('Error fetching recipe details:', error.response.data);
            }
        };

        fetchRecipeDetails();
    }, [id]);

    if (!recipe) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>{recipe.name}</h1>
            <p>{recipe.description}</p>
            <h3>Ingredients</h3>
            <ul>
                {recipe.ingredients.map(ing => (
                    <li key={ing._id}>{ing.name} - {ing.description}</li>
                ))}
            </ul>
        </div>
    );
}

export default RecipeDetails;
