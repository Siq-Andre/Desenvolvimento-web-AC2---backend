const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Tarefa = require('../models/todoModel');
const auth = require('../middlewares/Auth');

const cadastraTarefa = async (req, res) => {
    try {       
        const { titulo, descricao, responsavel, concluido } = req.body;

        const tarefa = {
            titulo,
            descricao,
            responsavel,
            concluido
        };

        const novaTarefa = await Tarefa.create(tarefa);

        res.status(201).json(novaTarefa);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const listaTodasTarefas = async (req, res) => {
    try {
        const tarefa = await Tarefa.find();
        res.status(200).json(tarefa);
    } catch (error) {
        res.status(500).json({ error: error.message});
    }
};

const editaTarefa = async (req, res) => {
    try {
        const id = req.params.id;
        const { titulo, descricao, responsavel, concluido } = req.body;
        const tarefa =  { titulo, descricao, responsavel, concluido };
        const updateTarefa = await Tarefa.findByIdAndUpdate(id, tarefa, {new: true});
        if (!updateTarefa) {
            return res.status(404).json({ mensagem: "Tarefa não encontrada" });
        }
        res.status(200).json(tarefa);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const deletaTarefa = async (req, res) => {
    try {
        const id = req.params.id;
        const tarefa = await Tarefa.findById(id);
        if (!tarefa) {
            res.status(422).json({ mensagem: "Tarefa não encontrada" });
            return;
        }

        await Tarefa.findByIdAndDelete(id);
        res.status(200).json({ mensagem: "Excluído com sucesso!" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const tarefasSemDono = async (req, res) => {
    try {
        const tarefasSemDono = await Tarefa.find({ responsavel: null });

        res.status(200).json(tarefasSemDono);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const adicionarDono = async (req, res) => {
    try {
        const id = req.params.id;
        const { responsavel } = req.body;

        const tarefaAtualizada = await Tarefa.findByIdAndUpdate(
            id, 
            { responsavel }, 
            { new: true }
        );

        if (!tarefaAtualizada) {
            return res.status(404).json({ mensagem: "Tarefa não encontrada" });
        }

        res.status(200).json(tarefaAtualizada);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    cadastraTarefa,
    listaTodasTarefas,
    editaTarefa,
    deletaTarefa,
    tarefasSemDono,
    adicionarDono
};
