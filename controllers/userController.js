const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Usuario = require('../models/userModel');
const auth = require('../middlewares/Auth');

const cadastraUsuario = async (req, res) => {
    const { nome, email, senha, funcao} = req.body;
    const senhaEncrypt = await bcrypt.hash(senha, 10);
    const usuario = { nome, email, senha: senhaEncrypt, funcao};
    try {
        await Usuario.create(usuario);
        res.status(201).json(usuario);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const loginUsuario = async (req,res) => {
    const { email, senha} = req.body;
    const usuario = await Usuario.findOne({email: email})

    if (!usuario)
        res.status(402).send('Usuário não encontrado');

    if (await bcrypt.compare(senha, usuario.senha)) {
        const token = jwt.sign({id: usuario.id, nome: usuario.nome, email: usuario.email, funcao: usuario.funcao}, process.env.JWT_SECRET, {expiresIn: '30d'});

        res.status(200).json({
            nome: usuario.nome,
            funcao: usuario.funcao,
            token: token
        });
    }

    else {
        res.status(401).send('Email ou senha incorretos!');
    }
};


const listaTodosUsuarios = async (req, res) => {
    try {
        const usuarios = await Usuario.find();
        res.status(200).json(usuarios);
    } catch (error) {
        res.status(500).json({ error: error.message});
    }
};

const editaUsuario = async (req, res) => {
    try {
        const email = req.params.email;
        const { nome, novoEmail, senha, funcao} = req.body;
        const senhaEncrypt = await bcrypt.hash(senha, 10);
        const usuario = { nome, novoEmail, senha: senhaEncrypt, funcao};
        const updateUsuario = await Usuario.updateOne({ email: email }, usuario);
        if (updateUsuario.matchedCount === 0) {
            res.status(422).json({ mensagem: "Usuario não encontrado" });
            return;
        }
        res.status(200).json(usuario);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const cadastraUsuarioAutenticado = async (req, res) => {
    const { nome, email, senha, funcao} = req.body;
    const senhaEncrypt = await bcrypt.hash(senha, 10);
    const usuario = { nome, email, senha: senhaEncrypt, funcao};
    try {
        await Usuario.create(usuario);
        res.status(201).json(usuario);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const deletaUsuario = async (req, res) => {
    try {
        const email = req.params.email;
        const usuario = await Usuario.findOne({  email: email });
        if (!usuario) {
            res.status(422).json({ mensagem: "Usuario não encontrado" });
            return;
        }
        await Usuario.deleteOne({  email: email });
        res.status(200).json({ mensagem: "Excluído com sucesso!" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const contarUsuariosPorFuncao = async (req, res) => {
    try {
        // Agrupar usuários por função e contar a quantidade em cada grupo
        const usuariosPorFuncao = await Usuario.aggregate([
            { $group: { _id: "$funcao", total: { $sum: 1 } } }
        ]);

        // Retornar os resultados
        res.status(200).json(usuariosPorFuncao);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


module.exports = {
    cadastraUsuario,
    loginUsuario,
    listaTodosUsuarios,
    editaUsuario,
    cadastraUsuarioAutenticado,
    deletaUsuario,
    contarUsuariosPorFuncao
};
