const express = require('express');
const router = express.Router();
const connection = require('../../db');

router.put('/', async (req, res) => {
  try {
    console.log("ye");
    const accountID = req.body.updatedAccountData.AccountID;
    console.log(accountID);
    const updatedAccountData = req.body.updatedAccountData; 


    const query = 'UPDATE accounts SET ? WHERE AccountID = ?';
    const updateContact = await connection.query(query, [updatedAccountData, accountID]);

    res.status(200).json({ message: 'Account updated successfully.' });
  } catch (error) {
    console.error('Error executing query:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
