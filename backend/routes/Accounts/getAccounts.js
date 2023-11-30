const express = require('express');
const router = express.Router();
const connection = require('../../db');

router.get('/', async (req, res) => {
  try {
    const query = 'SELECT * FROM accounts'; 
    const accounts = await connection.query(query);
    console.log(accounts);
    res.json(accounts);

  } catch (error) {
    console.error('Error executing query:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
