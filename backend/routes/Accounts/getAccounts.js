const express = require('express');
const router = express.Router();
const connection = require('../../db');

router.get('/', async (req, res) => {
  try {
    let limit = req.query.limit || 10;
    let page = req.query.page || 1;
    let rank = req.query.rank;
    let column = req.query.column;
    page = parseInt(page, 10);
    limit = parseInt(limit, 10);
    const offset = (page - 1) * limit;
    let orderByClause = '';

    if (column && rank) {
      console.log(rank);
      orderByClause = `ORDER BY ${column} ${rank}`;
    }

    const query = `SELECT * FROM accounts ${orderByClause} LIMIT ${limit} OFFSET ${offset}`;

    const contacts = await connection.query(query);
    res.json(contacts);
  } catch (error) {
    console.error('Error executing query:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
