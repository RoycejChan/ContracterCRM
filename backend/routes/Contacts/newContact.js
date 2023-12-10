const express = require('express');
const router = express.Router(); 
const connection = require('../../db');

router.post('/', (req, res) => {

      const { newContact } = req.body;

  // Extract properties from newContact
  const {
    firstName,
    lastName,
    accountName,
    email,
    workPhone,
    mobilePhone,
    assistantName,
    title,
    department,
    fax,
    asstPhone,
  } = newContact;

  const query =
    'INSERT INTO contact (FirstName, LastName, AccountName, Email, WorkPhone, MobilePhone, Title, Department, Fax, AssistantName, AssistantPhone) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';

  // Placeholders avoid SQL injection
  const values = [
    firstName,
    lastName,
    accountName || null,
    email,
    workPhone || null,
    mobilePhone,
    title, 
    department,
    fax || null,
    assistantName || null,
    asstPhone || null,
  ];

  connection.query(query, values, (error, results) => {
    if (error) {
      console.error('Error executing query:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      res.json("hello");
    }
  });
});

module.exports = router;
