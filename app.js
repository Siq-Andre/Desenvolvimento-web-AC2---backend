const express = require('express');
const app = express();
require('dotenv').config();
const usuarioRouter = require('./routes/userRoutes');
const  mongoose = require('mongoose');
const { configDotenv } = require('dotenv');
app.use(express.json());
app.use('/', usuarioRouter)


const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;

mongoose.connect(`mongodb+srv://${DB_USER}:${DB_PASSWORD}@ac2-backend.so55l.mongodb.net/AC2-backend?retryWrites=true&w=majority&appName=AC2-backend`)
    .then(() => {
        app.listen(3000, () => {
            console.log('Conectado ao MongoDB');
            console.log('Servidor iniciado na porta 3000');
        });
    })
    .catch((err) => {
        console.error('Erro ao conectar ao MongoDB:', err);
    });