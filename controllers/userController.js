const Usuario = require('../models/userModel');

const cadastraUsuario = async (req, res) => {
    const { nome, email, senha} = req.body;
    const usuario = { nome, email, senha};
    try {
        await Usuario.create(usuario);
        res.status(201).json(usuario);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    cadastraUsuario
};

