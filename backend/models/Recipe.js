// models/Recipe.js
const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: String,
  instructions: {
    type: String,
    required: true
  },
  ingredients: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Ingredient'
  }]
});

const Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = Recipe;
