const axios = require('axios');

async function getCEPInfo(req, res) {
    try {
      const { cep } = req.params;
      const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
  
      // Verifique se a requisição foi bem-sucedida
      if (response.status === 200) {
        const data = response.data;
        res.status(200).json(data);
      } else {
        res.status(response.status).json({ error: 'Erro ao obter informações do CEP' });
      }
    } catch (error) {
      console.error('Erro ao obter informações do CEP:', error.message);
      res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }
  
  module.exports = {
    getCEPInfo,
  };