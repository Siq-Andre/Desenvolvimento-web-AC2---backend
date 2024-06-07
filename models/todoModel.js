const mongoose = require('mongoose');
const todo = mongoose.model('todo', {
    titulo: String,
    descricao: String,
    conclusao: String
});
module.exports = todo;