const jwt = require('jsonwebtoken');
require('dotenv').config();

const auth = async (request, response, next) => {
    const authHeader = request.headers.authorization;
    if(!authHeader) {
        return response.status(401).json({message: 'Token é obrigatório'});
    }

    const[, token] = authHeader.split(" ");
    try {
        const senha = process.env.JWT_SECRET;
        request.user = jwt.verify(token, senha)
        await jwt.verify(token, senha);
        next();
    } catch(error){
        return response.status(401).json({message: 'Token inválido'});
    }
};

module.exports = auth;