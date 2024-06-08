const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/userController');
const auth = require('../middlewares/Auth');

router.post('/cadastraUsuario', usuarioController.cadastraUsuario);
router.post('/loginUsuario', usuarioController.loginUsuario);
router.get('/ListaUsuario', auth, usuarioController.listaTodosUsuarios);
router.put('/editaUsuario/:email', auth, usuarioController.editaUsuario);
router.post('/cadastraUsuarioAutenticado',auth,  usuarioController.cadastraUsuarioAutenticado);
router.delete('/deletaUsuario/:email',auth, usuarioController.deletaUsuario);
router.get('/contarUsuariosPorFuncao', auth, usuarioController.contarUsuariosPorFuncao);

module.exports = router;
