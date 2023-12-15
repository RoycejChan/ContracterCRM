const express = require('express');
const router = express.Router();
const connection = require('../../db');

router.get('/', async (req, res) => {
  try {
    let limit = req.query.limit || 10;
    let page = req.query.page || 1;
    let rank = req.query.rank;
    let column = req.query.column;
    let filterCondition = req.query.filterCondition || '';
    let filterColumn = req.query.filterColumn;
    page = parseInt(page, 10);
    limit = parseInt(limit, 10);
    const offset = (page - 1) * limit;
    let orderByClause = '';
    let whereClause = '';

    if (column && rank) {
      if (column === 'Priority') {
        orderByClause = `ORDER BY ${column} = '${rank}' DESC, ${column}`;
      } else if (column === 'Status')  {
        orderByClause = `ORDER BY ${column} = '${rank}' DESC, ${column}`;
      }
      else {
        orderByClause = `ORDER BY ${column} ${rank}`;
      }
    }
  
    if (filterColumn && filterCondition) {
      if (filterCondition === filterColumn) {
        whereClause = `WHERE ${filterColumn} IS NULL`
      } else {
        whereClause = `WHERE ${filterColumn} LIKE '${filterCondition}'`;
      }
      }

    const query = `SELECT * FROM tasks ${whereClause} ${orderByClause} LIMIT ${limit} OFFSET ${offset}`;
    const contacts = await connection.query(query);
    res.json(contacts);
  } catch (error) {
    console.error('Error executing query:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
