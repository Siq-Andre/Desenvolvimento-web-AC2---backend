const Todo = require('../models/todoModel');

const cadastraTarefa = async (req, res) => {
    const { titulo, descricao, conclusao} = req.body;
    const todo = { titulo, descricao, conclusao};
    try {
        await Todo.create(todo);
        res.status(201).json(todo);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    cadastraTarefa
};