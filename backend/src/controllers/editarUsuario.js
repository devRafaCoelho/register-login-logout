const { pool } = require("../config/register_login_logout");

const bcrypt = require("bcrypt");

const editarUsuario = async (req, res) => {
  const { usuarioLogado } = req;
  const { nome, email, senha } = req.body;

  if (!usuarioLogado) {
    return res.status(401).json({ mensagem: "Acesso negado" });
  }

  if (!nome || nome === "" || nome === " ") {
    return res.status(400).json({ mensagem: "O campo nome é obrigatório" });
  }

  if (!email || email === "" || email === " ") {
    return res.status(400).json({ mensagem: "O campo email é obrigatório" });
  }

  if (!senha || senha === "" || senha === " ") {
    return res.status(400).json({ mensagem: "O campo senha é obrigatório" });
  }

  const senhaCriptografada = await bcrypt.hash(senha, 10);

  try {
    const queryConsultaExisteEmail = `SELECT * FROM usuarios WHERE email = $1 AND id != $2`;
    const paramsConsultaExisteEmail = [email, usuarioLogado.id];
    const { rowCount: rowCountConsultaExisteEmail } = await pool.query(queryConsultaExisteEmail, paramsConsultaExisteEmail);

    if (rowCountConsultaExisteEmail > 0) {
      return res.status(400).json({ mensagem: "O Email informado já está sendo utilizado, verifique e tente novamente." });
    }

    const queryAtualizarUsuario = `UPDATE usuarios SET nome = $1, email = $2, senha =$3 WHERE id = $4`;
    const paramsAtualizarUsuario = [nome, email, senhaCriptografada, usuarioLogado.id];
    const usuarioAtualizado = await pool.query(queryAtualizarUsuario, paramsAtualizarUsuario);

    return res.status(204).json();

  } catch (error) {
    return res.status(500).json({ mensagem: "Erro interno no servidor, aguarde e tente novamente." });
  }
};

module.exports = {
  editarUsuario,
};