const { pool } = require("../config/register_login_logout");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const realizarLogin = async (req, res) => {
    const { email, senha } = req.body;

    if (!email || !senha) {
        return res.status(400).json({
            mensagem: "Todos os campos são obrigatórios para efetuar o login",
        });
    }

    if (email === " ") {
        return res
            .status(400)
            .json({ mensagem: "Por favor, informe seu email!" });
    }

    if (senha === " ") {
        return res
            .status(400)
            .json({ mensagem: "Por favor, informe sua senha!" });
    }

    try {
        const queryConsultaExisteEmail = `SELECT * FROM usuarios WHERE email = $1`;
        const paramsConsultaExisteEmail = [email];
        const resultadoConsulta = await pool.query(
            queryConsultaExisteEmail,
            paramsConsultaExisteEmail
        );

        if (!resultadoConsulta.rowCount) {
            return res.status(404).json({
                mensagem:
                    "Dados de usuário inválidos, verifique e tente novamente.",
            });
        }

        const usuarioEncontrado = resultadoConsulta.rows[0];

        const compararSenha = await bcrypt.compare(
            senha,
            usuarioEncontrado.senha
        );

        if (!compararSenha) {
            return res.status(400).json({
                mensagem:
                    "Dados de usuário inválidos, verifique e tente novamente.",
            });
        }

        const token = jwt.sign({ id: usuarioEncontrado.id }, "1234567890", {
            expiresIn: "1h",
        });

        const { senha: _, ...dadosDoUsuarioEncontrado } = usuarioEncontrado;

        return res
            .status(200)
            .json({ usuario: { ...dadosDoUsuarioEncontrado }, token: token });
    } catch (error) {
        return res.status(500).json({
            mensagem: "Erro inerno no servidor, aguarde e tente novamente.",
        });
    }
};

module.exports = {
    realizarLogin,
};
