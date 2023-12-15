// db.js
const mysql = require('mysql2/promise');
require('dotenv').config({ path: '../.env' });

console.log(`${process.env.RDS_USER} yes`);
const connection = mysql.createPool({
  host: process.env.RDS_ENDPOINT,
  user: process.env.RDS_USER,
  password: process.env.RDS_PASS,
  database: 'serncrm',
  port: process.env.RDS_PORT
});

connection.getConnection()
  .then(connection => {
    console.log('Connected to database.');
    connection.release(); // Release the connection when done
  })
  .catch(err => {
    console.error('Database connection failed: ' + err.stack);
  });

module.exports = connection;
