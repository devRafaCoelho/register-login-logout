const express = require("express");

const { registerUser } = require("./controllers/registerUser");
const { logIn } = require("./controllers/logIn");
const { verificarLogin } = require("./middleware/verificarLogin");

const rotas = express();

rotas.post("/register", registerUser);
rotas.post("/", logIn);

rotas.use(verificarLogin);

module.exports = {
    rotas,
};
