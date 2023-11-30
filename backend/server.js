const express = require('express');
const cors = require('cors');
const contactRoutes = require('./routes/Contacts/contactRoutes');

const port = 3000;

const app = express();

app.use(express.json({ extended: true }));
app.use(express.urlencoded({ extended: false }));
app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:5174"],
  })
);

app.use('/Contact', contactRoutes); // Use the contactRoutes

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
