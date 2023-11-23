const db = require('../db');

// Rota para lidar com a solicitação GET de categorias
  function getCategorias(req, res){
    try {
      // Lógica para buscar os dados dos produtos no banco de dados
      const sql = "SELECT * FROM `categorias`";

      db.query(sql, (err, result) => {
        if (err) {
          console.error("Erro ao buscar categorias no banco de dados: " + err);
          res.status(500).json({ error: "Erro interno do servidor" });
        } else {
          console.log("Categorias retornados com sucesso");
          res.status(200).json(result); // Assumindo que 'result' contêm os dados retornados da categoria
        }
      });
    } catch (error) {
      // Lide com erros de validação ou outros
      res.status(400).json({ error: "Erro ao retornar categorias" });
    }
  }

  // Rota para lidar com a solicitação GET de categoria por ID
  function getCategoriaById(req, res){
    try {
      const { id } = req.params;
      // Lógica para buscar os dados da categoria no banco de dados
      const sql = "SELECT * FROM `categorias` WHERE id = ?";

      db.query(sql, [id], (err, result) => {
        if (err) {
          console.error("Erro ao buscar categoria no banco de dados: " + err);
          res.status(500).json({ error: "Erro interno do servidor" });
        } else if (result.length === 0) {
          console.error("Categoria não encontrada");
          res.status(404).json({ error: "Categoria não encontrada" });
        } else {
          console.log("Categoria retornada com sucesso");
          res.status(200).json(result[0]); // Assumindo que 'result' contêm os dados retornados da categoria
        }
      });
    } catch (error) {
      // Lide com erros de validação ou outros
      res.status(400).json({ error: "Erro ao retornar categoria" });
    }
  }

  // Rota para lidar com a solicitação POST do formulário
  function categorias(req, res){
    try {
      const { nome, descricao } = req.body;

      // Lógica para inserir os dados da categoria no banco de dados
      const sql = "INSERT INTO categorias (nome, descricao) VALUES (?, ?)";
      const values = [nome, descricao];

      db.query(sql, values, (err, result) => {
        if (err) {
          console.error("Erro ao inserir categoria no banco de dados: " + err);
          res.status(500).json({ error: "Erro interno do servidor" });
        } else {
          console.log("Categoria cadastrado com sucesso");
          res.status(200).json({ message: "Categoria cadastrada com sucesso" });
        }
      });
    } catch (error) {
      // Lide com erros de validação ou outros
      res.status(400).json({ error: "Erro ao cadastrar a categoria" });
    }
  }

  // Rota para lidar com a solicitação PUT de categoria pelo ID
  function editCategoriaById(req, res){
    try {
      const { id } = req.params;
      const { nome, descricao } = req.body;

      // Lógica para atualizar os dados do cliente no banco de dados com base no ID
      const sql = `UPDATE categorias SET nome = ?, descricao = ? WHERE id = ?`;
      const values = [nome, descricao, id];

      db.query(sql, values, (err, result) => {
        if (err) {
          console.error(
            "Erro ao atualizar categoria no banco de dados: " + err
          );
          res.status(500).json({ error: "Erro interno do servidor" });
        } else if (result.affectedRows === 0) {
          console.log("Categoria não encontrada");
          res.status(404).json({ error: "Categoria não encontrada" });
        } else {
          console.log("Categoria atualizada com sucesso");
          res.status(200).json({ success: true });
        }
      });
    } catch (error) {
      // Lide com erros de validação ou outros
      res.status(400).json({ error: "Erro ao atualizar categoria" });
    }
  }

  // Rota para lidar com a solicitação DELETE de categoria por ID
  function deleteCategoriaById(req, res){
    try {
      const { id } = req.params;
      // Lógica para buscar os dados da categoria no banco de dados
      const sql = "DELETE FROM `categorias` WHERE id = ?";

      db.query(sql, [id], (err, result) => {
        if (err) {
          console.error("Erro ao excluir categoria no banco de dados: " + err);
          res.status(500).json({ error: "Erro interno do servidor" });
        } else if (result.length === 0) {
          console.error("Categoria não encontrada");
          res.status(404).json({ error: "Categoria não encontrada" });
        } else {
          console.log("Categoria excluida com sucesso");
          res.status(200).json(result[0]); // Assumindo que 'result' contêm os dados retornados da categoria
        }
      });
    } catch (error) {
      // Lide com erros de validação ou outros
      res.status(400).json({ error: "Erro ao excluir categoria" });
    }
  }


  module.exports = {
    getCategorias,
    getCategoriaById,
    categorias,
    editCategoriaById,
    deleteCategoriaById
  };