const express = require("express");

const { registerUser } = require("./controllers/registerUser");
const { realizarLogin } = require("./controllers/realizarLogin");
const { verificarLogin } = require("./middleware/verificarLogin");

const rotas = express();

rotas.post("/register", registerUser);
rotas.post("/", realizarLogin);

rotas.use(verificarLogin);

module.exports = {
    rotas,
};
