const db = require('../db');

// Rota para lidar com a solicitação GET de produtos
function getProdutos(req, res){
  try {
    // Lógica para buscar os dados dos produtos no banco de dados
    const sql =
      "SELECT produtos.id, produtos.nome, produtos.descricao, `preco`, `estoque`, `categoria_id`, `caminho_img`, categorias.nome AS `categoria`, produtos.created_at, produtos.updated_at FROM `produtos` INNER JOIN `categorias` WHERE `categoria_id` = categorias.id;";

    db.query(sql, (err, result) => {
      if (err) {
        console.error("Erro ao buscar produtos no banco de dados: " + err);
        res.status(500).json({ error: "Erro interno do servidor" });
      } else {
        console.log("Produtos retornados com sucesso");
        res.status(200).json(result); // Assumindo que 'result' contêm os dados retornados do produto
      }
    });
  } catch (error) {
    // Lide com erros de validação ou outros
    res.status(400).json({ error: "Erro ao retornar produtos" });
  }
}

// Rota para lidar com a solicitação GET de produto por ID
function getProdutoById(req, res){
  try {
    const { id } = req.params;
    // Lógica para buscar os dados da produto no banco de dados
    const sql =
      "SELECT produtos.id, produtos.nome, produtos.descricao, `preco`, `estoque`, `categoria_id`, `caminho_img`, categorias.nome AS `categoria`, produtos.created_at, produtos.updated_at FROM `produtos` INNER JOIN `categorias` WHERE `categoria_id` = categorias.id AND produtos.id = ?";

    db.query(sql, [id], (err, result) => {
      if (err) {
        console.error("Erro ao buscar produto no banco de dados: " + err);
        res.status(500).json({ error: "Erro interno do servidor" });
      } else if (result.length === 0) {
        console.error("Produto não encontrado");
        res.status(404).json({ error: "Produto não encontrado" });
      } else {
        console.log("Produto retornada com sucesso");
        res.status(200).json(result[0]); // Assumindo que 'result' contêm os dados retornados da categoria
      }
    });
  } catch (error) {
    // Lide com erros de validação ou outros
    res.status(400).json({ error: "Erro ao retornar produto" });
  }
}

// Rota para lidar com a solicitação POST do formulário
function produtos(req, res){
  try {
    const { nome, descricao, preco, estoque, categoria_id, imagem } = req.body;

    // Lógica para inserir os dados do produto no banco de dados
    const sql =
      "INSERT INTO produtos (nome, descricao, preco, estoque, categoria_id, caminho_img) VALUES (?, ?, ?, ?, ?, ?)";
    const values = [nome, descricao, preco, estoque, categoria_id, imagem];

    db.query(sql, values, (err, result) => {
      if (err) {
        console.error("Erro ao inserir produto no banco de dados: " + err);
        res.status(500).json({ error: "Erro interno do servidor" });
      } else {
        console.log("Produto cadastrado com sucesso");
        res.status(200).json({ message: "Produto cadastrado com sucesso" });
      }
    });
  } catch (error) {
    // Lide com erros de validação ou outros
    res.status(400).json({ error: "Erro ao cadastrar o produto" });
  }
}

// Rota para lidar com a solicitação PUT de produto pelo ID
function editProdutoById(req, res){
  try {
    const { id } = req.params;
    const { nome, descricao, preco, estoque, categoria_id, imagem } = req.body;

    // Lógica para atualizar os dados do cliente no banco de dados com base no ID
    const sql = `UPDATE produtos SET nome = ?, descricao = ?, preco = ?, estoque = ?, categoria_id = ?, caminho_img = ? WHERE id = ?`;
    const values = [nome, descricao, preco, estoque, categoria_id, imagem, id];

    db.query(sql, values, (err, result) => {
      if (err) {
        console.error("Erro ao atualizar produto no banco de dados: " + err);
        res.status(500).json({ error: "Erro interno do servidor" });
      } else if (result.affectedRows === 0) {
        console.log("Produto não encontrado");
        res.status(404).json({ error: "Produto não encontrado" });
      } else {
        console.log("Produto atualizado com sucesso");
        res.status(200).json({ success: true });
      }
    });
  } catch (error) {
    // Lide com erros de validação ou outros
    res.status(400).json({ error: "Erro ao atualizar produto" });
  }
}

function deleteProdutoById(req, res){
  try {
    const { id } = req.params;
    // Lógica para buscar os dados da produto no banco de dados
    const sql = "DELETE FROM `produtos` WHERE id = ?";

    db.query(sql, [id], (err, result) => {
      if (err) {
        console.error("Erro ao excluir produto no banco de dados: " + err);
        res.status(500).json({ error: "Erro interno do servidor" });
      } else if (result.length === 0) {
        console.error("Produto não encontrado");
        res.status(404).json({ error: "Produto não encontrado" });
      } else {
        console.log("Produto excluido com sucesso");
        res.status(200).json(result[0]); // Assumindo que 'result' contêm os dados retornados da categoria
      }
    });
  } catch (error) {
    // Lide com erros de validação ou outros
    res.status(400).json({ error: "Erro ao excluir produto" });
  }
}

module.exports = {
  getProdutos,
  getProdutoById,
  produtos,
  editProdutoById,
  deleteProdutoById
};