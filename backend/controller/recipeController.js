const Recipe = require('../models/Recipe');
const Ingredient = require('../models/Ingredient');

// Controller functions
exports.getAllRecipes = async (req, res) => {
  try {
    const recipes = await Recipe.find();
    res.json(recipes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createRecipe = async (req, res) => {
  const recipe = new Recipe({
    title: req.body.title,
    description: req.body.description,
    instructions: req.body.instructions,
    ingredients: req.body.ingredients
  });

  try {
    const newRecipe = await recipe.save();
    res.status(201).json(newRecipe);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.updateRecipe = async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) {
      return res.status(404).json({ message: 'Recipe not found' });
    }

    // Update recipe fields
    if (req.body.title != null) {
      recipe.title = req.body.title;
    }
    if (req.body.description != null) {
      recipe.description = req.body.description;
    }
    if (req.body.instructions != null) {
      recipe.instructions = req.body.instructions;
    }
    if (req.body.ingredients != null) {
      recipe.ingredients = req.body.ingredients;
    }

    const updatedRecipe = await recipe.save();
    res.json(updatedRecipe);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.deleteRecipe = async (req, res) => {
  try {
    await Recipe.findByIdAndDelete(req.params.id);
    res.json({ message: 'Recipe deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.addIngredient = async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) {
      return res.status(404).json({ message: 'Recipe not found' });
    }

    const ingredient = new Ingredient({
      name: req.body.name,
      quantity: req.body.quantity
    });

    const newIngredient = await ingredient.save();
    recipe.ingredients.push(newIngredient);
    const updatedRecipe = await recipe.save();

    res.status(201).json(updatedRecipe);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.removeIngredient = async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) {
      return res.status(404).json({ message: 'Recipe not found' });
    }

    const index = recipe.ingredients.indexOf(req.params.ingredientId);
    if (index === -1) {
      return res.status(404).json({ message: 'Ingredient not found in recipe' });
    }

    recipe.ingredients.splice(index, 1);
    await recipe.save();

    res.json({ message: 'Ingredient removed from recipe' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
