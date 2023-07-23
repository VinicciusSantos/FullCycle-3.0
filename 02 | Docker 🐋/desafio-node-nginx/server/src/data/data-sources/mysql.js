const mysql = require("mysql");

module.exports = function setupDatabase() {
  const connection = mysql.createConnection({
    host: "db",
    user: "root",
    password: "password",
    database: "nodedb",
  });

  connection.connect((err) => {
    if (err) {
      console.log("Database connection Error:", err);
      return;
    }
    console.log("Database Connected!");
    connection.query(`
      CREATE TABLE IF NOT EXISTS pessoas(
        id int auto_increment,
        nome varchar(100) not null,
        primary key(id)
      )
    `)
  });

  return connection
};
