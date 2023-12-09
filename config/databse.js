const { createPool } = require("mysql");

const pool = createPool({
    port: 3307,
    host: "127.0.0.1",
    user: "root",
    password: "",
    database: "adapti_mart_v1",
    connectionLimit: 10,
  });
  
  module.exports = pool;
  