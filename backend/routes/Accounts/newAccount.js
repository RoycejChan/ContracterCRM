const express = require('express');
const router = express.Router(); 
const connection = require('../../db');

router.post('/', (req, res) => {

      const { newAccount } = req.body;

  // Extract properties from newAccount
  const {
    AccountName,
    AccountSite,
    Industry,
    AnnualRevenue,
    FrontDeskPhone,
    Fax,
    Street,
    City,
    State,
    Zip,
    Country,
    Email,
  } = newAccount;

  const query =
    'INSERT INTO accounts (AccountName, AccountSite, Industry, AnnualRevenue, FrontDeskPhone, Fax, Street, City, State, Zip, Country, Email) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';

  // Placeholders avoid SQL injection
  const values = [
    AccountName,
    AccountSite,
    Industry,
    AnnualRevenue,
    FrontDeskPhone,
    Fax || null,
    Street,
    City,
    State,
    Zip,
    Country,
    Email,
  ];

  connection.query(query, values, (error, results) => {
    if (error) {
      console.error('Error executing query:', error);
      res.status(500).json({ error:'Server Error' });
    } else {
      res.json(results);
    }
  });
});

module.exports = router;
