const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/userController');

router.post('/cadastraCliente', usuarioController.cadastraUsuario);

module.exports = router;
