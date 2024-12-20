const Pool = require("pg").Pool;

const pool = new Pool({
    user: "postgres",
    database: "langusers",
    port: 6000,
    host: "localhost",
    password: "Solcha129",
})

module.exports = pool;