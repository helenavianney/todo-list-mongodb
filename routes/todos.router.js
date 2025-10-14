const express = require('express');
const router = express.Router();
const { getAllTodos, createTodo, getTodoById, updateTodo, deleteTodo, deleteAllTodos } = require('../controllers/todos.controller');
const { auth } = require('../middleware/auth');

router.get('/', auth, getAllTodos);
router.post('/', auth, createTodo);
router.get('/:id', auth, getTodoById);
router.put('/:id', auth, updateTodo);
router.delete('/:id', auth, deleteTodo);
router.delete('/', auth, deleteAllTodos);

module.exports = router;