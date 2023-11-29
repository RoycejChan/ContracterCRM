const express = require('express');
const cors = require('cors');

const port = 3000;

const connection = require('./db');

const app = express();

app.use(express.json({ extended: true }));
app.use(express.urlencoded({ extended: false }));
app.use(
	cors({
	   origin: ["http://localhost:5173", "http://localhost:5174"],
	})
  );
  

  app.post('/Contacts', (req, res) => {
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
        console.log('Contact added successfully');
        res.json(results);
      }
    });
  });
  
  
  


// app.get('/Contacts', (req, res) => {
//   const query = 'SELECT * FROM Contacts';

//   connection.query(query, (error, results) => {
//     if (error) {
//       console.error('Error executing query:', error);
//       res.status(500).json({ error: 'Internal Server Error' });
//     } else {
//       res.json(results);
//     }
//   });
// });
// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
