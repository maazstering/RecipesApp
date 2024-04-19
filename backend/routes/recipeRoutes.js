const { Router } = require('express');
const recipeController = require('../controller/recipeController');
const authController = require('../controller/authController');
const jwt = require('jsonwebtoken'); 
const User = require('../models/User');
const multer = require('multer');

const upload = multer({ dest: 'uploads/' });


const router = Router();

const requireAdmin = (req, res, next) => {
    
    const token = req.headers.authorization.split(' ')[1];
    console.log(" ye hai token ", token);
    if (token) {
        jwt.verify(token, 'hasan secret', async (err, decodedToken) => {
            if (err) {
                res.status(403).json({ error: 'Not authorized, token failed' });
            } else {
                const user = await User.findById(decodedToken.id);
                if (user && user.role === 'admin') {
                    next();
                } else {
                    res.status(403).json({ error: 'Not authorized as admin' });
                }
            }
        });
    } else {
        res.status(403).json({ error: 'Not authorized, no token' });
    }
};

router.post('/ingredient', requireAdmin, recipeController.add_ingredient); 
router.post('/recipe', requireAdmin, recipeController.add_recipe); 
router.get('/recipes', recipeController.view_recipes); 
router.get('/ingredients', requireAdmin, recipeController.list_ingredients);

router.get('/recipe/:id', recipeController.view_recipe_details); 
router.post('/recipe/upload', upload.single('file'), requireAdmin, recipeController.add_recipe_csv);


module.exports = router;
