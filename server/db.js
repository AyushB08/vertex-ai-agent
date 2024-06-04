const Pool = require("pg").Pool;
const pool = new Pool({ 
    user: "ayushbheemaiah",
    password: "ayush",
    host: "localhost",
    port: 4000,
    database: "emails"
})

module.exports = pool;