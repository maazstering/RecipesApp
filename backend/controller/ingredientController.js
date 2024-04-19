const Ingredient = require('../models/Ingredient');

exports.createIngredient = async (req, res) => {
  const { name, quantity } = req.body;

  try {
    // Check if ingredient already exists to avoid duplicates
    let ingredient = await Ingredient.findOne({ name: name });
    if (ingredient) {
      return res.status(400).json({ message: 'Ingredient already exists' });
    }

    ingredient = new Ingredient({
      name,
      quantity
    });

    await ingredient.save();
    res.status(201).json(ingredient);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
exports.getAllIngredients = async (req, res) => {
  try {
    const ingredients = await Ingredient.find();
    res.json(ingredients);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getIngredient = async (req, res) => {
  try {
    const ingredient = await Ingredient.findById(req.params.id);
    if (!ingredient) {
      return res.status(404).json({ message: 'Ingredient not found' });
    }
    res.json(ingredient);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createIngredient = async (req, res) => {
  const ingredient = new Ingredient({
    name: req.body.name,
    quantity: req.body.quantity
  });

  try {
    const newIngredient = await ingredient.save();
    res.status(201).json(newIngredient);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.updateIngredient = async (req, res) => {
  try {
    const ingredient = await Ingredient.findById(req.params.id);
    if (!ingredient) {
      return res.status(404).json({ message: 'Ingredient not found' });
    }

    ingredient.name = req.body.name ?? ingredient.name;
    ingredient.quantity = req.body.quantity ?? ingredient.quantity;

    const updatedIngredient = await ingredient.save();
    res.json(updatedIngredient);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.deleteIngredient = async (req, res) => {
  try {
    const ingredient = await Ingredient.findByIdAndDelete(req.params.id);
    if (!ingredient) {
      return res.status(404).json({ message: 'Ingredient not found' });
    }
    res.json({ message: 'Ingredient deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
