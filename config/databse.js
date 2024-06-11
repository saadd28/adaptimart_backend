const mysql = require("mysql2");

const pool = mysql.createPool({
    port: 12425,
    host: "adaptimartv1-adaptimart.d.aivencloud.com",
    user: "avnadmin",
    password: "AVNS_uBbu5R7jvWhu8i4AG8X",
    database: "defaultdb",
    connectionLimit: 10,
});

module.exports = pool.promise();
