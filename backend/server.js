const express = require('express');
const cors = require('cors');
const contactRoutes = require('./routes/Contacts/contactRoutes');
const accountRoutes = require('./routes/Accounts/accountRoutes');
const taskRoutes = require('./routes/Tasks/taskRoutes');

const port = 3000;

const app = express();

app.use(express.json({ extended: true }));
app.use(express.urlencoded({ extended: false }));
app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:5174"],
  })
);

app.use('/Contact', contactRoutes); 
app.use('/Account', accountRoutes); 
app.use('/Task', taskRoutes); 

// Start the servers
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
