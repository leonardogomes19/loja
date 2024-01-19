const cors = require("cors");
const express = require("express");
const next = require("next");


const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

const viaCepController = require('./controllers/api/viaCepController');
const clientesController = require('./controllers/clientesController');
const categoriasController = require('./controllers/categoriasController');
const produtosController = require('./controllers/produtosController');
const usuariosController = require('./controllers/usuariosController');
const vendasController = require('./controllers/vendasController');

app.prepare().then(() => {
  const server = express();

  // Configure o CORS
  server.use(cors());

  // Middleware para lidar com o parsing do corpo da solicitação
  server.use(express.urlencoded({ extended: true }));
  server.use(express.json());

  /* CONTROLLER API VIA CEP */

  server.get('/getCEPInfo/:cep', (req, res) => {
    viaCepController.getCEPInfo(req, res);
  });

  /* CONTROLLER CLIENTES */

  server.get("/getClientes", (req, res) => {
    clientesController.getClientes(req, res);
  });

  server.get("/getCliente/:id", (req, res) => {
    clientesController.getClienteById(req, res);
  });

  server.post("/clientes", (req, res) => {
    clientesController.clientes(req, res);
  });

  server.put("/editCliente/:id", (req, res) => {
    clientesController.editClienteById(req, res);
  });

  server.delete("/deleteCliente/:id", (req, res) => {
    clientesController.deleteClienteById(req, res);
  });

  /* CONTROLLER CATEGORIAS */

  server.get("/getCategorias", (req, res) => {
    categoriasController.getCategorias(req, res);
  });

  server.get("/getCategoria/:id", (req, res) => {
    categoriasController.getCategoriaById(req, res);
  });

  server.post("/categorias", (req, res) => {
    categoriasController.categorias(req, res);
  });

  server.put("/editCategoria/:id", (req, res) => {
    categoriasController.editCategoriaById(req, res);
  });

  server.delete("/deleteCategoria/:id", (req, res) => {
    categoriasController.deleteCategoriaById(req, res);
  });


  /* CONTROLLER PRODUTOS */

  server.get("/getProdutos", (req, res) => {
    produtosController.getProdutos(req, res);
  });

  server.get("/getProduto/:id", (req, res) => {
    produtosController.getProdutoById(req, res);
  });

  server.post("/produtos", (req, res) => {
    produtosController.produtos(req, res);
  });

  server.put("/editProduto/:id", (req, res) => {
    produtosController.editProdutoById(req, res);
  });

  server.delete("/deleteProduto/:id", (req, res) => {
    produtosController.deleteProdutoById(req, res);
  });


  /* CONTROLLER USUARIOS */

  server.get("/getUsuarios", (req, res) => {
    usuariosController.getUsuarios(req, res);
  });

  server.post("/getUsuarioByLogin", (req, res) => {
    usuariosController.getUsuarioByLogin(req, res);
  });

  server.get("/getUsuario/:id", (req, res) => {
    usuariosController.getUsuarioById(req, res);
  });

  server.post("/usuarios", (req, res) => {
    usuariosController.usuarios(req, res);
  });

  server.put("/editUsuario/:id", (req, res) => {
    usuariosController.editUsuarioById(req, res);
  });

  server.delete("/deleteUsuario/:id", (req, res) => {
    usuariosController.deleteUsuarioById(req, res);
  });


  /* CONTROLLER VENDAS */

  server.get("/getVendas", (req, res) => {
    vendasController.getVendas(req, res);
  });

  server.get("/getVenda/:id", (req, res) => {
    vendasController.getVendaById(req, res);
  });

  server.post("/vendas", (req, res) => {
    vendasController.vendas(req, res);
  });

  server.put("/editVenda/:id", (req, res) => {
    vendasController.editVendaById(req, res);
  });

  server.delete("/deleteVenda/:id", (req, res) => {
    vendasController.deleteVendaById(req, res);
  });

  

  server.get("*", (req, res) => {
    return handle(req, res);
  });

  const port = process.env.PORT || 3001;
  server.listen(port, () => {
    console.log(`Servidor Node.js está ouvindo na porta ${port}`);
  });
});
