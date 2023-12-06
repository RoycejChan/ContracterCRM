const express = require('express');
const router = express.Router();
const connection = require('../../db');

router.delete('/', async (req, res) => {
  try {
    
    const selectedTaskIDs = req.body.recordsToDelete;
    const query = `DELETE FROM tasks WHERE taskID IN (?)`;
    const deleteTasks = await connection.query(query, [selectedTaskIDs]);
  } catch (error) {
    console.error('Error executing query:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
