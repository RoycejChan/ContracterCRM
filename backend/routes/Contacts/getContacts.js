const express = require('express');
const router = express.Router();
const connection = require('../../db');

router.get('/', async (req, res) => {
  try {
    const query = 'SELECT * FROM contact'; 
    const contacts = await connection.query(query);
    console.log(contacts);
    res.json(contacts);

  } catch (error) {
    console.error('Error executing query:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
