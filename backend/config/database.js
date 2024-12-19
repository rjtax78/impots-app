const Pool = require("pg").Pool;

const connectDb = new Pool({
  user: "postgres",
  password: "rjtax78",
  host: "localhost",
  port: 5432,
  database: "gestion_impots",
});

module.exports = connectDb;
