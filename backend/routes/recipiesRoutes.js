// routes/recipeRoutes.js
const express = require('express');
const router = express.Router();
const recipeController = require('../controllers/recipeController');

router.get('/recipes', recipeController.getAllRecipes);
router.post('/recipes', recipeController.createRecipe);
router.delete('/recipes',recipeController.removeRecipe);
router.update('/recipes',recipeController.updateRecipie);


module.exports = router;
