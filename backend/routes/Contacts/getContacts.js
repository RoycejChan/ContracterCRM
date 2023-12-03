const express = require('express');
const router = express.Router();
const connection = require('../../db');

router.get('/', async (req, res) => {
  try {
    let limit = req.query.limit || 10; // Use a default limit of 10 if not provided
    limit = parseInt(limit, 10); 

    const query = `SELECT * FROM contact LIMIT ${limit}`;
    const contacts = await connection.query(query);
    console.log(contacts);
    res.json(contacts);

  } catch (error) {
    console.error('Error executing query:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
