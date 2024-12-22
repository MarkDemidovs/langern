const { Client } = require('pg');

const client = new Client({
    host: "localhost",
    user: "postgres",
    port: 6000,
    password: "Solcha129",
    database: "langern"
});

client.connect();

module.exports = client;