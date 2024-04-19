import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './Login';
import Signup from './Signup';
import Recipes from './components/Recipes';
import AddIngredient from './components/AddIngredient';
import AddRecipe from './components/AddRecipe';
import ProtectedRoute from './ProtectedRoute';
import RecipeDetails from './components/RecipeDetails';


function App() {
    return (
        <Router>
            <div>
                <Routes>
                    <Route path="/" element={<Navigate replace to="/login" />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/login" element={<Login />} />
                    {/* Redirects any unknown paths to /login */}
                    <Route path="*" element={<Navigate to="/login" />} />
                    <Route path="/recipes" element={<Recipes />} />
                    <Route 
                    path="/add-ingredient" 
                    element={
                        <ProtectedRoute>
                            <AddIngredient />
                        </ProtectedRoute>
                    } 
                />
                <Route 
                    path="/add-recipe" 
                    element={
                        <ProtectedRoute>
                            <AddRecipe />
                        </ProtectedRoute>
                    } 
                />
                <Route path="/recipe/:id" element={<RecipeDetails />} />
                </Routes>
            </div>
        </Router>
    );  
}

export default App;
