const express = require('express');
const router = express.Router();
const todoController = require('../controllers/todoController');
const auth = require('../middlewares/Auth');

router.post('/cadastraTarefa', todoController.cadastraTarefa);
router.get('/ListaTarefa', auth, todoController.listaTodasTarefas);
router.put('/editaTarefa/:id', todoController.editaTarefa);
router.delete('/deletaTarefa/:id',auth, todoController.deletaTarefa);
router.get('/tarefaSemDono', auth, todoController.tarefasSemDono);
router.put('/adicionarDono/:id', auth, todoController.adicionarDono);

module.exports = router;