  // db.js
  const mysql = require('mysql2/promise');
  require('dotenv').config({ path: '../.env' });

  const connection = mysql.createPool({
    host: process.env.RDS_HOST,
    user: process.env.RDS_USER,
    password: process.env.RDS_PASS,
    port: process.env.RDS_PORT,
    database:process.env.RDS_DB
  });

connection.getConnection()
  .then(connection => {
    console.log('Connected to database.');
    connection.release(); 
  })
  .catch(err => {
    console.error('Database connection failed: ' + err.stack);
  });

  module.exports = connection;


