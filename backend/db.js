// db.js
const mysql = require('mysql2/promise');

const connection = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'BlacknWhite',
  database: 'crm',
});


module.exports = connection;
