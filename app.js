const express = require('express');
const app = express();
require('dotenv').config(); 

const usuarioRouter = require('./routes/userRoutes');
const todoRouter = require('./routes/todoRoutes');
const mongoose = require('mongoose');

app.use(express.json());

app.use('/usuarios', usuarioRouter);
app.use('/todos', todoRouter);

const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_NAME = process.env.DB_NAME;
const PORT = process.env.PORT || 3000;

mongoose.connect(`mongodb+srv://${DB_USER}:${DB_PASSWORD}@ac2-backend.so55l.mongodb.net/${DB_NAME}?retryWrites=true&w=majority&appName=AC2-backend`)
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Conectado ao MongoDB`);
            console.log(`Servidor iniciado na porta ${PORT}`);
        });
    })
    .catch((err) => {
        console.error('Erro ao conectar ao MongoDB:', err);
    });
