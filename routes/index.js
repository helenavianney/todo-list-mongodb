const express = require('express');
const router = express.Router();
const usersRouter = require('./users.router');
const todosRouter = require('./todos.router');

router.use('/api/users', usersRouter);
router.use('/api/todos', todosRouter);

module.exports = router;