const express = require('express');
const router = express.Router();
const todoController = require('../controllers/todoController');

router.post('/cadastraTarefa', todoController.cadastraTarefa);

module.exports = router;