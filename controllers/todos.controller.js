const todosModel = require('../models/todos.model');

module.exports = {
    getAllTodos: async (req, res) => {
        try {
            const todos = await todosModel.find().populate('assignedTo', 'username');
            res.status(200).json({
                message: 'get all todos',
                data: todos
            });
        } catch (error) {
            res.status(500).json({ message: 'Server error', error: error.message });
        }
    },
    
    createTodo: async (req, res) => {
        try {
            const { title, isCompleted, assignedTo } = req.body;
            
            if (!title) {
                return res.status(400).json({ message: 'Title is required' });
            }
            
            const newTodo = new todosModel({ 
                title,
                isCompleted: isCompleted || false,
                assignedTo,
            });
            
            await newTodo.save();
            res.status(201).json({
                message: 'Todo created successfully',
                data: newTodo
            });
        } catch (error) {
            res.status(500).json({ message: 'Server error', error: error.message });
        }
    },
    
    getTodoById: async (req, res) => {
        try {
            const { id } = req.params;
            const todo = await todosModel.findById(id).populate('assignedTo', 'username');

            if(!todo) {
                return res.status(404).json({
                    message: 'Todo not found'
                });
            }

            res.status(200).json({
                message: 'get todo by id',
                data: todo
            });
        } catch (error) {
            res.status(500).json({ message: 'Server error', error: error.message });
        }
    },
    
    updateTodo: async (req, res) => {
        try {
            const { id } = req.params;
            const { title, isCompleted, assignedTo } = req.body;
            
            const todo = await todosModel.findByIdAndUpdate(id, {
                title,
                isCompleted,
                assignedTo,
                updatedAt: Date.now()
            }, { new: true }).populate('assignedTo', 'username');
            
            if (!todo) {
                return res.status(404).json({
                    message: 'Todo not found'
                });
            }
            
            res.status(200).json({
                message: 'Todo updated successfully',
                data: todo
            });
        } catch (error) {
            res.status(500).json({ message: 'Server error', error: error.message });
        }
    },
    
    deleteTodo: async (req, res) => {
        try {
            const { id } = req.params;
            const todo = await todosModel.findByIdAndDelete(id);
            
            if (!todo) {
                return res.status(404).json({
                    message: 'Todo not found'
                });
            }
            
            res.status(200).json({
                message: 'Todo deleted successfully',
                data: todo
            });
        } catch (error) {
            res.status(500).json({ message: 'Server error', error: error.message });
        }
    },
    
    deleteAllTodos: async (req, res) => {
        try {
            const result = await todosModel.deleteMany({});
            res.status(200).json({
                message: 'All todos deleted successfully',
                data: { deletedCount: result.deletedCount }
            });
        } catch (error) {
            res.status(500).json({ message: 'Server error', error: error.message });
        }
    }
};