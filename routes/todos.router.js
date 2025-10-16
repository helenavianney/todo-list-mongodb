const express = require('express');
const router = express.Router();
const { getAllTodos, createTodo, getTodoById, updateTodo, deleteTodo, deleteAllTodos } = require('../controllers/todos.controller');
const { auth } = require('../middleware/auth');

router.get('/', getAllTodos);
router.post('/', createTodo);
router.get('/:id', getTodoById);
router.put('/:id', updateTodo);
router.delete('/:id', deleteTodo);
router.delete('/', deleteAllTodos);

module.exports = router;