const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/user');

// user signup
router.post('/signup', async (req, res) => {
    const { username, password } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({username, password: hashedPassword });
        const newUser = await user.save();
        res.status(201).json({ message: `user ${username} registered`});
    } catch (error) {
        res.status(400).json({ message: error.message });
    };
});

// user login
router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ username });
        if (!user) { 
            return res.status(400).json({ message: "Invalid username or password"});
        }

        const compare = await bcrypt.compare(password, user.password);
        if (!compare) {
            return res.status(401).json({ message: "Invalid username or password"});
        }

        const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, {
            expiresIn: '1 hour'
        });

        res.status(200).json({ token });
    } catch (error) {
        res.status(401).json({ message: error.message });
    }
});

module.exports = router;