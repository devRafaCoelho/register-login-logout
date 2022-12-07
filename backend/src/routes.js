const express = require("express");

const { cadastrarUsuario } = require("./controllers/cadastrarUsuario");
const { realizarLogin } = require("./controllers/realizarLogin");
const { verificarLogin } = require("./middleware/verificarLogin");
const { detalharUsuario } = require("./controllers/detalharUsuario");
const { editarUsuario } = require("./controllers/editarUsuario");

const rotas = express();

rotas.post("/cadastro", cadastrarUsuario);
rotas.post("/login", realizarLogin);

rotas.use(verificarLogin);

rotas.get("/usuario", detalharUsuario)
rotas.put("/usuario", editarUsuario);

module.exports = {
    rotas
}