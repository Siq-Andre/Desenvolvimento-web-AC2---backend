const mongoose = require('mongoose');
require('dotenv').config();
const app = require('../app');

const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;

mongoose.connect(`mongodb+srv://${DB_USER}:${DB_PASSWORD}@clusterteste.zktha3l.mongodb.net/?retryWrites=true&w=majority&appName=ClusterTeste`)
    .then(() => {
        app.listen(3000, () => {
            console.log('Conectado ao MongoDB');
            console.log('Servidor iniciado na porta 3000');
        });
    })
    .catch((err) => {
        console.error('Erro ao conectar ao MongoDB:', err);
    });

module.exports = mongoose.connection;
