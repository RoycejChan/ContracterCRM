const express = require('express');
const router = express.Router();
const connection = require('../../db');

router.get('/', async (req, res) => {
  try {
    let limit = req.query.limit || 10; // Use a default limit of 10
    let page = req.query.page || 1;   // Use a default page of 1
    page = parseInt(page, 10);

    limit = parseInt(limit, 10); 
    const offset = (page - 1) * limit;

    const query = `SELECT * FROM tasks LIMIT ${limit} OFFSET ${offset}`; 
    const tasks = await connection.query(query);
    res.json(tasks);

  } catch (error) {
    console.error('Error executing query:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
