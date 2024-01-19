const db = require("../db");
const bcrypt = require("bcrypt");
const saltRounds = 10;

// Rota para lidar com a solicitação GET de usuarios
function getUsuarios(req, res) {
  try {
    // Lógica para buscar os dados dos usuarios no banco de dados
    const sql = "SELECT * FROM `usuarios`";

    db.query(sql, (err, result) => {
      if (err) {
        console.error("Erro ao buscar usuários no banco de dados: " + err);
        res.status(500).json({ error: "Erro interno do servidor" });
      } else {
        console.log("Usuários retornados com sucesso");
        res.status(200).json(result); // Assumindo que 'result' contêm os dados retornados do usuário
      }
    });
  } catch (error) {
    // Lide com erros de validação ou outros
    res.status(400).json({ error: "Erro ao retornar usuários" });
  }
}

// Rota para lidar com a solicitação GET de usuário pelo login
function getUsuarioByLogin(req, res) {
  try {
    let { usuario, senha } = req.body;
    // Lógica para buscar os dados do usuário no banco de dados
    const sql = "SELECT * FROM usuarios WHERE usuario = ?";
    const values = [usuario];

    db.query(sql, values, (err, result) => {
      if (err) {
        console.error("Erro ao buscar usuário no banco de dados: " + err);
        res.status(500).json({ error: "Erro interno do servidor" });
      } else if (result.length === 0) {
        console.error("Usuário não encontrado");
        res.status(404).json({ error: "Usuário não encontrado" });
      } else {
        const storedHash = result[0].senha;
        const data = result[0];

        bcrypt.compare(senha, storedHash, function (err, result) {
          if (result) {
            console.log("Usuário retornado com sucesso");
            res.status(200).json(data); // Assumindo que 'result' contêm os dados retornados da categoria
          } else {
            console.log("Senha incorreta! O usuário não pode fazer login.");
            res.status(404).json({ error: "Senha incorreta!" });
          }
        });
      }
    });
  } catch (error) {
    // Lide com erros de validação ou outros
    res.status(400).json({ error: "Erro ao retornar usuário" });
  }
}

// Rota para lidar com a solicitação GET de usuário por ID
function getUsuarioById(req, res) {
  try {
    const { id } = req.params;
    // Lógica para buscar os dados do usuário no banco de dados
    const sql = "SELECT * FROM usuarios WHERE id = ?";

    db.query(sql, [id], (err, result) => {
      if (err) {
        console.error("Erro ao buscar usuário no banco de dados: " + err);
        res.status(500).json({ error: "Erro interno do servidor" });
      } else if (result.length === 0) {
        console.error("Usuário não encontrado");
        res.status(404).json({ error: "Usuário não encontrado" });
      } else {
        console.log("Usuário retornado com sucesso");
        res.status(200).json(result[0]); // Assumindo que 'result' contêm os dados retornados da categoria
      }
    });
  } catch (error) {
    // Lide com erros de validação ou outros
    res.status(400).json({ error: "Erro ao retornar usuário" });
  }
}

// Rota para lidar com a solicitação POST do formulário
async function usuarios(req, res) {
  try {
    let { usuario, senha, nivel } = req.body;

    // Gere um salt
    const salt = await bcrypt.genSalt(saltRounds);

    // Hash da senha
    const hashedPassword = await bcrypt.hash(senha, salt);

    senha = hashedPassword;

    // Lógica para inserir os dados do usuário no banco de dados
    const insertSql = "INSERT INTO usuarios (usuario, senha, nivel) VALUES (?, ?, ?)";
    const values = [usuario, senha, nivel];

    db.query(insertSql, values, (err, result) => {
      if (err) {
        console.error("Erro ao inserir usuário no banco de dados: " + err);
        res.status(500).json({ error: "Erro interno do servidor" });
      } else {
        const userId = result.insertId;

        // Consulta para obter os dados do usuário recém-cadastrado
        const selectSql = "SELECT * FROM usuarios WHERE id = ?";
        db.query(selectSql, [userId], (err, userData) => {
          if (err) {
            console.error("Erro ao obter dados do usuário cadastrado: " + err);
            res.status(500).json({ error: "Erro interno do servidor" });
          } else {
            const data = userData[0];
            console.log("Usuário cadastrado com sucesso");
            res.status(200).json(data);
          }
        });
      }
    });
  } catch (error) {
    // Lide com erros de validação ou outros
    console.error("Erro ao cadastrar o usuário: " + error.message);
    res.status(400).json({ error: "Erro ao cadastrar o usuário" });
  }
}

// Rota para lidar com a solicitação PUT de usuario pelo ID
function editUsuarioById(req, res) {
  try {
    const { id } = req.params;
    const { usuario, senha, nivel } = req.body;

    // Lógica para atualizar os dados do usuario no banco de dados com base no ID
    const sql = `UPDATE usuarios SET usuario = ?, senha = ?, nivel = ? WHERE id = ?`;
    const values = [usuario, senha, nivel, id];

    db.query(sql, values, (err, result) => {
      if (err) {
        console.error("Erro ao atualizar usuário no banco de dados: " + err);
        res.status(500).json({ error: "Erro interno do servidor" });
      } else if (result.affectedRows === 0) {
        console.log("Usuário não encontrado");
        res.status(404).json({ error: "Usuário não encontrado" });
      } else {
        console.log("Usuário atualizado com sucesso");
        res.status(200).json({ success: true });
      }
    });
  } catch (error) {
    // Lide com erros de validação ou outros
    res.status(400).json({ error: "Erro ao atualizar usuário" });
  }
}

// Rota para lidar com a solicitação DELETE de usuario por ID
function deleteUsuarioById(req, res) {
  try {
    const { id } = req.params;
    // Lógica para buscar os dados do usuário no banco de dados
    const sql = "DELETE FROM `usuarios` WHERE id = ?";

    db.query(sql, [id], (err, result) => {
      if (err) {
        console.error("Erro ao excluir usuário no banco de dados: " + err);
        res.status(500).json({ error: "Usuário interno do servidor" });
      } else if (result.length === 0) {
        console.error("Usuário não encontrado");
        res.status(404).json({ error: "Usuário não encontrado" });
      } else {
        console.log("Usuário excluido com sucesso");
        res.status(200).json(result[0]); // Assumindo que 'result' contêm os dados retornados da categoria
      }
    });
  } catch (error) {
    // Lide com erros de validação ou outros
    res.status(400).json({ error: "Erro ao excluir usuário" });
  }
}

module.exports = {
  getUsuarios,
  getUsuarioByLogin,
  getUsuarioById,
  usuarios,
  editUsuarioById,
  deleteUsuarioById,
};
