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
  


app.get('/Contacts', (req, res) => {
    const { newContact } = req.body;
    console.log(newContact);

    const query = 'SELECT * FROM Contacts';
    // const values = [newContact.first_name, newContact.last_name, newContact.email];


  connection.query(query, (error, results) => {
    if (error) {
      console.error('Error executing query:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      res.json(results);
    }
  });
});



// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
