const db = require("../db");

function getVendas(req, res) {
    try {
        // Lógica para buscar os dados das vendas no banco de dados
        const sql =
            "SELECT `id`, `cliente_id`, `produto_id`, clientes.nome AS nomeVenda, produtos.nome AS nomeProduto, `quantidade`, `valorVenda`, `cidade`, `estado`, `endereco`, `status`, `created_at`, `updated_at` FROM `vendas`" +
            "INNER JOIN `clientes`" +
            "INNER JOIN `produtos`" +
            "WHERE clientes.id = `cliente_id` AND produtos.id = `produto_id`";

        db.query(sql, (err, result) => {
            if (err) {
                console.error("Erro ao buscar vendas no banco de dados: " + err);
                res.status(500).json({ error: "Erro interno do servidor" });
            } else {
                console.log("Vendas retornadas com sucesso");
                res.status(200).json(result); // Assumindo que 'result' contêm os dados retornados da venda
            }
        });
    } catch (error) {
        // Lide com erros de validação ou outros
        res.status(400).json({ error: "Erro ao retornar vendas" });
    }
}

function getVendaById(req, res) {
    try {
        const { id } = req.params;
        const sql =
            "SELECT `id`, `cliente_id`, `produto_id`, clientes.nome AS nomeVenda, produtos.nome AS nomeProduto, `quantidade`, `valorVenda`, `cidade`, `estado`, `endereco`, `status`, `created_at`, `updated_at` FROM `vendas`" +
            "INNER JOIN `clientes`" +
            "INNER JOIN `produtos`" +
            "WHERE clientes.id = `cliente_id` AND produtos.id = `produto_id` AND vendas.id = ?";

        db.query(sql, [id], (err, result) => {
            if (err) {
                console.error("Erro ao buscar venda no banco de dados: " + err);
                res.status(500).json({ error: "Erro interno do servidor" });
            } else if (result.length === 0) {
                console.error("Venda não encontrada");
                res.status(404).json({ error: "Venda não encontrada" });
            } else {
                console.log("Venda retornada com sucesso");
                res.status(200).json(result[0]); // Assumindo que 'result' contêm os dados retornados da venda
            }
        });
    } catch (error) {
        // Lide com erros de validação ou outros
        res.status(400).json({ error: "Erro ao retornar venda" });
    }
}

function vendas(req, res) {
    try {
        const { cliente_id, produto_id, quantidade, valorVenda, cidade, estado, endereco } = req.body;

        // Lógica para inserir os dados da venda no banco de dados
        const sql =
            "INSERT INTO vendas (cliente_id, produto_id, quantidade, valorVenda, cidade, estado, endereco) VALUES (?, ?, ?, ?, ?, ?, ?)";
        const values = [cliente_id, produto_id, quantidade, valorVenda, cidade, estado, endereco];

        db.query(sql, values, (err, result) => {
            if (err) {
                console.error("Erro ao inserir venda no banco de dados: " + err);
                res.status(500).json({ error: "Erro interno do servidor" });
            } else {
                console.log("Venda cadastrada com sucesso");
                res.status(200).json({ message: "Venda cadastrada com sucesso" });
            }
        });
    } catch (error) {
        // Lide com erros de validação ou outros
        res.status(400).json({ error: "Erro ao cadastrar a venda" });
    }
}

function editVendaById(req, res) {
    try {
        const { id } = req.params;
        const { cliente_id, produto_id, quantidade, valorVenda, cidade, estado, endereco } = req.body;

        // Lógica para atualizar os dados da venda no banco de dados com base no ID
        const sql = `UPDATE vendas SET cliente_id = ?, produto_id = ?, quantidade = ?, valorVenda = ?, cidade = ?, estado = ?, endereco = ? WHERE id = ?`;
        const values = [cliente_id, produto_id, quantidade, valorVenda, cidade, estado, endereco, id];

        db.query(sql, values, (err, result) => {
            if (err) {
                console.error("Erro ao atualizar venda no banco de dados: " + err);
                res.status(500).json({ error: "Erro interno do servidor" });
            } else if (result.affectedRows === 0) {
                console.log("Venda não encontrada");
                res.status(404).json({ error: "Venda não encontrada" });
            } else {
                console.log("Venda atualizada com sucesso");
                res.status(200).json({ success: true });
            }
        });
    } catch (error) {
        // Lide com erros de validação ou outros
        res.status(400).json({ error: "Erro ao atualizar venda" });
    }
}

function deleteVendaById(req, res){
    try {
        const { id } = req.params;
        // Lógica para buscar os dados da produto no banco de dados
        const sql = "DELETE FROM `vendas` WHERE id = ?";
    
        db.query(sql, [id], (err, result) => {
          if (err) {
            console.error("Erro ao excluir venda no banco de dados: " + err);
            res.status(500).json({ error: "Erro interno do servidor" });
          } else if (result.length === 0) {
            console.error("Venda não encontrada");
            res.status(404).json({ error: "Venda não encontrada" });
          } else {
            console.log("Venda excluída com sucesso");
            res.status(200).json(result[0]); // Assumindo que 'result' contêm os dados retornados da venda
          }
        });
      } catch (error) {
        // Lide com erros de validação ou outros
        res.status(400).json({ error: "Erro ao excluir venda" });
      }
}

module.exports = {
    getVendas,
    getVendaById,
    vendas,
    editVendaById,
    deleteVendaById
}