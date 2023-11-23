const mysql = require('mysql');

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "loja",
});

db.connect((err) => {
  if (err) {
    console.error("Erro na conexão com o banco de dados: " + err);
  } else {
    console.log("Conexão bem-sucedida com o banco de dados MySQL.");
  }
});

// código para encerrar a conexão MySQL ao encerrar o aplicativo
process.on("SIGINT", () => {
  db.end();
  process.exit();
});

module.exports = db;