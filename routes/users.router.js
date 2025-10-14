const express = require('express');
const router = express.Router();
const { getAllUsers, createUser, getUserById, login } = require('../controllers/users.controller');
const { auth } = require('../middleware/auth');

router.post('/login', login);
router.post('/', createUser);
router.get('/', auth, getAllUsers);
router.get('/:id', auth, getUserById);

module.exports = router;