const Recipe = require('../models/Recipe');
const Ingredient = require('../models/ingredients');
const multer = require('multer');
const csv = require('csv-parse');
const fs = require('fs');


const upload = multer({ dest: 'uploads/' });

module.exports.add_recipe_csv = (req, res) => {
    const file = req.file.path;
    const recipes = [];

    fs.createReadStream(file)
        .pipe(csv.parse({ columns: true, delimiter: ',' }))
        .on('data', (data) => {
            recipes.push({
                name: data.name,
                description: data.description,
                ingredients: data.ingredients.split(',').map(id => id.trim())
            });
        })
        .on('end', async () => {
            try {
                await Recipe.insertMany(recipes);
                res.status(201).json({ message: 'Recipes added successfully' });
            } catch (err) {
                res.status(400).json({ error: err.message });
            }
            fs.unlinkSync(file); 
        })
        .on('error', (err) => {
            res.status(500).json({ error: 'Failed to process file' });
        });
};


module.exports.add_ingredient = async (req, res) => {
    const { name, description } = req.body;
    try {
        const ingredient = new Ingredient({ name, description });
        await ingredient.save();
        res.status(201).json(ingredient);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

module.exports.add_recipe = async (req, res) => {
    const { name, description, ingredients } = req.body;
    try {
        const recipe = new Recipe({ name, description, ingredients });
        await recipe.save();
        res.status(201).json(recipe);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

module.exports.view_recipes = async (req, res) => {
    try {
        const recipes = await Recipe.find().populate('ingredients');
        res.status(200).json(recipes);
    } catch (err) {
        res.status(500).json({ error: 'Error fetching recipes' });
    }
};

module.exports.view_recipe_details = async (req, res) => {
    try {
        const recipe = await Recipe.findById(req.params.id).populate('ingredients');
        if (!recipe) {
            res.status(404).json({ error: 'Recipe not found' });
        } else {
            res.status(200).json(recipe);
        }
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
};
