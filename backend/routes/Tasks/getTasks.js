const express = require('express');
const router = express.Router();
const connection = require('../../db');

router.get('/', async (req, res) => {
  try {
    let limit = req.query.limit || 10; // Use a default limit of 10
    limit = parseInt(limit, 10); 

    const query = `SELECT * FROM tasks LIMIT ${limit}`; 
    const tasks = await connection.query(query);
    res.json(tasks);

  } catch (error) {
    console.error('Error executing query:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
