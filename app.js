const express = require('express');
const app = express();
const mongoose = require('mongoose');
const usuarioRouter = require('./routes/userRoutes');
app.use(express.json());
app.use('/usuarios', usuarioRouter)