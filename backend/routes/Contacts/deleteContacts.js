const express = require('express');
const router = express.Router();
const connection = require('../../db');

router.delete('/', async (req, res) => {
  try {
    const selectedContactIDs = req.body.recordsToDelete;
    const query = `DELETE FROM contact WHERE ContactID IN (?)`;
    const deleteContacts = await connection.query(query, [selectedContactIDs]);
    console.log(deleteContacts);
    res.json({ message: 'Contacts deleted successfully' });

  } catch (error) {
    console.error('Error executing query:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
