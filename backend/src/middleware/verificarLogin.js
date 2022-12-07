const jwt = require("jsonwebtoken");
const { pool } = require("../config/register_login_logout");

const verificarLogin = async (req, res, next) => {
    const { authorization } = req.headers;

    if (!authorization) {
        return res.status(401).json({ menssagem: "Acesso não autorizado" })
    }

    const token = authorization.split(" ")[1];

    try {
        const { id } = jwt.verify(token, "1234567890");

        const queryConsultaId = `SELECT * FROM usuarios WHERE id = $1`;
        const paramsConsultaId = [id]
        const resultadoConsultaId = await pool.query(queryConsultaId, paramsConsultaId)

        if (!resultadoConsultaId.rowCount) {
            return res.status(401).json({ menssagem: "Acesso não autorizado" });
        }

        const usuarioLogado = resultadoConsultaId.rows[0];
        const { senha: _, ...dadosDoUsuarioLogado } = usuarioLogado;

        req.usuarioLogado = dadosDoUsuarioLogado;
        return next();


    } catch (error) {
        return res.status(500).json({ mensagem: "Erro inerno no servidor, aguarde e tente novamente." });
    }


}


module.exports = {
    verificarLogin
}