const mongoose = require('mongoose');
const todo = mongoose.model('todo', {
    titulo: String,
    descricao: String,
    responsavel: String,
    concluido: { type: Boolean, default: false }
});
module.exports = todo;