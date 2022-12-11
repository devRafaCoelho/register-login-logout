const express = require("express");

const { cadastrarUsuario } = require("./controllers/cadastrarUsuario");
const { realizarLogin } = require("./controllers/realizarLogin");
const { verificarLogin } = require("./middleware/verificarLogin");

const rotas = express();

rotas.post("/cadastro", cadastrarUsuario);
rotas.post("/", realizarLogin);

rotas.use(verificarLogin);

module.exports = {
    rotas,
};
