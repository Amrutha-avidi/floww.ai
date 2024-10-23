const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User'); 
require('dotenv').config();

const router = express.Router();

router.post('/register', async (req, res) => {
    const { name, password } = req.body;
    try {
        let user = await User.findOne({ name });
        if (user) {
            return res.status(400).send({ message: 'User already exists' });
        }
        user = new User({ name, password });
        await user.save();
        res.status(201).send({ message: 'User registered successfully' });
    } catch (error) {
        res.status(500).send({ message: 'Error registering user', error });
    }
});

router.post('/login', async (req, res) => {
    const { name, password } = req.body;
    try {
        const user = await User.findOne({ name });
        if (!user) {
            return res.status(400).send({ message: 'Invalid credentials' });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).send({ message: 'Invalid credentials' });
        }
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.cookie('jwt_token', token, { httpOnly: true });
        res.send({ message: 'Login successful', token });
    } catch (error) {
        res.status(500).send({ message: 'Error logging in', error });
    }
});

module.exports = router;
