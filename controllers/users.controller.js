const usersModel = require('../models/users.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../middleware/auth');

module.exports = {
    getAllUsers: async (req, res) => {
        try {
            const users = await usersModel.find().select('-password');
            res.status(200).json({
                message: 'get all users',
                data: users
            });
        } catch (error) {
            res.status(500).json({ message: 'Server error', error: error.message });
        }
    },
    
    createUser: async (req, res) => {
        try {
            const { username, password } = req.body;
            
            if (!username || !password) {
                return res.status(400).json({ message: 'Username and password are required' });
            }
            
            const existingUser = await usersModel.findOne({ username });
            if (existingUser) {
                return res.status(409).json({ message: 'Username already exists' });
            }
            
            const hashedPassword = await bcrypt.hash(password, 10);
            const newUser = new usersModel({ 
                username,
                password: hashedPassword
            });
            
            await newUser.save();
            const userResponse = newUser.toObject();
            delete userResponse.password;
            
            res.status(201).json({
                message: 'User created successfully',
                data: userResponse
            });
        } catch (error) {
            res.status(500).json({ message: 'Server error', error: error.message });
        }
    },
    
    login: async (req, res) => {
        try {
            const { username, password } = req.body;
            
            if (!username || !password) {
                return res.status(400).json({ message: 'Username and password are required' });
            }
            
            const user = await usersModel.findOne({ username });
            if (!user) {
                return res.status(401).json({ message: 'Invalid credentials' });
            }
            
            const isValidPassword = await bcrypt.compare(password, user.password);
            if (!isValidPassword) {
                return res.status(401).json({ message: 'Invalid password' });
            }
            
            const token = jwt.sign(
                { userId: user._id, username: user.username },
                JWT_SECRET,
                { expiresIn: '24h' }
            );
            
            res.status(200).json({
                message: 'Login successful',
                data: {
                    token,
                    user: {
                        _id: user._id,
                        username: user.username
                    }
                }
            });
        } catch (error) {
            res.status(500).json({ message: 'Server error', error: error.message });
        }
    },
    
    getUserById: async (req, res) => {
        try {
            const { id } = req.params;
            const user = await usersModel.findById(id).select('-password');

            if(!user) {
                return res.status(404).json({
                    message: 'User not found'
                });
            }

            res.status(200).json({
                message: 'get user by id',
                data: user
            });
        } catch (error) {
            res.status(500).json({ message: 'Server error', error: error.message });
        }
    }
};