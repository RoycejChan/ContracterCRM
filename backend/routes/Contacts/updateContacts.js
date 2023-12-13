const express = require('express');
const router = express.Router();
const connection = require('../../db');

router.put('/', async (req, res) => {
  try {
    console.log("ye");
    const contactID = req.body.updatedContactData.ContactID;
    console.log(contactID);
    const updatedContactData = req.body.updatedContactData; 
    console.log(updatedContactData);


    const query = 'UPDATE contact SET ? WHERE ContactID = ?';
    const updateContact = await connection.query(query, [updatedContactData, contactID]);

    res.status(200).json({ message: 'Contact updated successfully.' });
  } catch (error) {
    console.error('Error executing query:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
