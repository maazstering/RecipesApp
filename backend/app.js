const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const profileRoutes = require('./routes/profileRoutes');
const userRoutes = require('./routes/userRoutes');
const recipeRoutes = require('./routes/recipeRoutes'); 
const cookieParser = require('cookie-parser');
const { checkUser } = require('./middleware/authmiddleware');
const ingredientRoutes = require('./routes/ingredientRoutes'); 

const app = express();

// Middleware
app.use(express.static('public'));
app.use(express.json());
app.use(cookieParser());

// View engine
app.set('view engine', 'ejs');

// Database connection
const dbURI = 'mongodb+srv://Maaz:maaz54321@aagah.fmtdt7z.mongodb.net/?retryWrites=true&w=majority&appName=aagah';

app.use(cors());
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
  .then(() => {
    app.listen(5000, () => {
      console.log('Server is listening on port 5000');
    });
  })
  .catch((err) => console.log(err));

// Routes
app.get('*', checkUser);
app.get('/', (req, res) => res.render('home'));

// Mount routes
app.use('/users', userRoutes);
app.use(authRoutes);
app.use(profileRoutes);
app.use('/recipes', recipeRoutes); 
app.use('/ing', ingredientRoutes);




