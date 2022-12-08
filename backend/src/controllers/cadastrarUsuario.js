const { pool } = require("../config/register_login_logout");
const bcrypt = require("bcrypt");

const cadastrarUsuario = async (req, res) => {
    const { nome, email, senha } = req.body;

    if (!nome || nome === "" || nome === " ") {
        return res.status(400).json({ mensagem: "O campo nome é obrigatório" });
    }

    if (!email || email === "" || email === " ") {
        return res
            .status(400)
            .json({ mensagem: "O campo email é obrigatório" });
    }

    if (!senha || senha === "" || senha === " ") {
        return res
            .status(400)
            .json({ mensagem: "O campo senha é obrigatório" });
    }

    try {
        const queryConsultaExisteEmail = `SELECT * FROM usuarios WHERE email = $1`;
        const paramsConsultaExisteEmail = [email];

        const { rowCount: rowCountConsultaExisteEmail } = await pool.query(
            queryConsultaExisteEmail,
            paramsConsultaExisteEmail
        );

        if (rowCountConsultaExisteEmail > 0) {
            return res.status(400).json({
                mensagem:
                    "Dados de cadastro inválidos, por favor verifique e tente novamente.",
            });
        }

        const senhaCriptografada = await bcrypt.hash(senha, 10);

        const queryCadastroUsuario = `INSERT INTO usuarios (nome, email, senha) VALUES ($1, $2, $3) returning *`;
        const paramsCadastroUsuario = [nome, email, senhaCriptografada];

        const { rows, rowCount } = await pool.query(
            queryCadastroUsuario,
            paramsCadastroUsuario
        );

        if (rowCount <= 0) {
            return res.status(500).json({
                mensagem:
                    "Erro interno no servidor, aguarde e tente novamente.",
            });
        }
        const usuarioCadastrado = rows[0];
        const { senha: _, ...dadosUsuarioCadastrado } = usuarioCadastrado;

        return res.status(201).json(dadosUsuarioCadastrado);
    } catch (error) {
        return res.status(500).json({
            mensagem: "Erro inerno no servidor, aguarde e tente novamente.",
        });
    }
};

module.exports = { cadastrarUsuario };
