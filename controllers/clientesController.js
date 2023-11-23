const db = require('../db');

// Rota para lidar com a solicitação GET de clientes
function getClientes(req, res) {
  try {
    // Lógica para buscar os dados dos clientes no banco de dados
    const sql = "SELECT * FROM clientes";

    db.query(sql, (err, result) => {
      if (err) {
        console.error("Erro ao buscar clientes no banco de dados: " + err);
        res.status(500).json({ error: "Erro interno do servidor" });
      } else {
        console.log("Clientes retornados com sucesso");
        res.status(200).json(result); // Assumindo que 'result' contêm os dados retornados do cliente
      }
    });
  } catch (error) {
    // Lide com erros de validação ou outros
    res.status(400).json({ error: "Erro ao retornar clientes" });
  }
}

// Rota para lidar com a solicitação GET de cliente pelo ID
function getClienteById(req, res) {
  try {
    const { id } = req.params;

    // Lógica para buscar os dados do cliente no banco de dados com base no ID
    const sql = `SELECT * FROM clientes WHERE id = ?`;

    db.query(sql, [id], (err, result) => {
      if (err) {
        console.error("Erro ao buscar cliente no banco de dados: " + err);
        res.status(500).json({ error: "Erro interno do servidor" });
      } else if (result.length === 0) {
        console.log("Cliente não encontrado");
        res.status(404).json({ error: "Cliente não encontrado" });
      } else {
        console.log("Cliente retornado com sucesso");
        res.status(200).json(result[0]); // Retorna o primeiro cliente encontrado (assumindo que há apenas um com esse ID)
      }
    });
  } catch (error) {
    // Lide com erros de validação ou outros
    res.status(400).json({ error: "Erro ao retornar cliente" });
  }
}

// Rota para lidar com a solicitação POST do formulário
function clientes(req, res){
  try {
    const { nome, idade, cpf, telefone, cep, bairro, cidade, estado, endereco, numero, complemento } = req.body;

    // Lógica para inserir os dados do cliente no banco de dados
    const sql =
      "INSERT INTO clientes (nome, idade, cpf, telefone, cep, bairro, cidade, estado, endereco, numero, complemento) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
    const values = [nome, idade, cpf, telefone, cep, bairro, cidade, estado, endereco, numero, complemento];

    db.query(sql, values, (err, result) => {
      if (err) {
        console.error("Erro ao inserir cliente no banco de dados: " + err);
        res.status(500).json({ error: "Erro interno do servidor" });
      } else {
        console.log("Cliente cadastrado com sucesso");
        res.status(200).json({ message: "Cliente cadastrado com sucesso" });
      }
    });
  } catch (error) {
    // Lide com erros de validação ou outros
    res.status(400).json({ error: "Erro ao cadastrar o cliente" });
  }
}

// Rota para lidar com a solicitação PUT de cliente pelo ID
function editClienteById(req, res){
  try {
    const { id } = req.params;
    const { nome, idade, cpf, telefone, cep, bairro, cidade, estado, endereco, numero, complemento } = req.body;

    // Lógica para atualizar os dados do cliente no banco de dados com base no ID
    const sql = `UPDATE clientes SET nome = ?, idade = ?, cpf = ?, telefone = ?, cep = ?, bairro = ?, cidade = ?, estado = ?, endereco = ?, numero = ?, complemento = ? WHERE id = ?`;
    const values = [nome, idade, cpf, telefone, cep, bairro, cidade, estado, endereco, numero, complemento, id];

    db.query(sql, values, (err, result) => {
      if (err) {
        console.error("Erro ao atualizar cliente no banco de dados: " + err);
        res.status(500).json({ error: "Erro interno do servidor" });
      } else if (result.affectedRows === 0) {
        console.log("Cliente não encontrado");
        res.status(404).json({ error: "Cliente não encontrado" });
      } else {
        console.log("Cliente atualizado com sucesso");
        res.status(200).json({ success: true });
      }
    });
  } catch (error) {
    // Lide com erros de validação ou outros
    res.status(400).json({ error: "Erro ao atualizar cliente" });
  }
}

// Rota para lidar com a solicitação DELETE de cliente pelo ID
function deleteClienteById(req, res){
  try {
    const { id } = req.params;

    // Lógica para buscar os dados do cliente no banco de dados com base no ID
    const sql = `DELETE FROM clientes WHERE id = ?`;

    db.query(sql, [id], (err, result) => {
      if (err) {
        console.error("Erro ao excluir cliente no banco de dados: " + err);
        res.status(500).json({ error: "Erro interno do servidor" });
      } else if (result.length === 0) {
        console.log("Cliente não encontrado");
        res.status(404).json({ error: "Cliente não encontrado" });
      } else {
        console.log("Cliente excluido com sucesso");
        res.status(200).json(result[0]); // Retorna o primeiro cliente encontrado (assumindo que há apenas um com esse ID)
      }
    });
  } catch (error) {
    // Lide com erros de validação ou outros
    res.status(400).json({ error: "Erro ao excluir cliente" });
  }
}

module.exports = {
  getClientes,
  getClienteById,
  clientes,
  editClienteById,
  deleteClienteById
};