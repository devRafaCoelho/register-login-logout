const { pool } = require("../config/register_login_logout");

const detalharUsuario = async (req, res) => {
  const { usuarioLogado } = req;

  try {
    const queryConsultaUsuario = `SELECT * FROM usuarios WHERE id = $1`;
    const paramsConsultaUsuario = [usuarioLogado.id];
    const resultadoConsultaUsuario = await pool.query(queryConsultaUsuario, paramsConsultaUsuario);

    const dadosDoUsuario = resultadoConsultaUsuario.rows[0];
    const { senha: _, ...dadosDoUsuarioLogado } = dadosDoUsuario;

    return res.status(200).json(dadosDoUsuarioLogado);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ mensagem: "Erro inerno no servidor, aguarde e tente novamente." });
  }
};

module.exports = {
  detalharUsuario,
};
