const { createPool } = require("mysql");

const pool = createPool({
    port: 3306,
    host: "http://adaptimartv1.cxegism0q4e1.eu-north-1.rds.amazonaws.com",
    user: "root",
    password: "12345678",
    database: "adaptimartv1",
    connectionLimit: 10,
  });
  
  module.exports = pool;
  