const express = require('express');
const router = express.Router(); 
const connection = require('../../db');

router.post('/', (req, res) => {
  const { newTask } = req.body;
  // Extract properties from newTask
  const {
    TaskName,
    Priority,
    Status,
    Description,
    Location,
    DueDate,
    Company,
    Service,
    Manager
  } = newTask;

  const query =
    'INSERT INTO tasks (Subject, Priority, Status, Description, Location, DueDateTime, Account, Service, Manager) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';

  // Format the date as needed
  const formattedDueDate = DueDate ? DueDate.replace(/-/g, '') : null;

  // Placeholders avoid SQL injection
  const values = [
    TaskName,
    Priority,
    Status,
    Description,
    Location,
    formattedDueDate,
    Company,
    Service,
    Manager
  ];

  connection.query(query, values, (error, results) => {
    if (error) {
      console.error('Error executing query:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      res.json(results);
    }
  });
});

module.exports = router;
