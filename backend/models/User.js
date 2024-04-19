const mongoose = require('mongoose');
const { isEmail } = require('validator');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true, validate: [isEmail, 'Please enter a valid email'] },
    password: { type: String, required: true, minlength: [6, 'Minimum password length is 6 characters'] },
    role: { type: String, enum: ['user', 'admin'], default: 'user' },
    recipes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Recipe' }]
});

userSchema.pre('save', async function (next) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

userSchema.post('save', function (doc, next) {
    console.log('New user was created and saved', doc);
    next();
});

userSchema.statics.login = async function (email, password) {
    const user = await this.findOne({ email });
    if (user) {
        const auth = await bcrypt.compare(password, user.password);
        if (auth) {
            return user;
        }
        throw Error('Incorrect password');
    }
    throw Error('Incorrect email');
};

const User = mongoose.model('User', userSchema);

module.exports = User;
