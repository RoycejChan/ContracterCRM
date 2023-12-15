const express = require('express');
const cors = require('cors');
const contactRoutes = require('./routes/Contacts/contactRoutes');
const accountRoutes = require('./routes/Accounts/accountRoutes');
const taskRoutes = require('./routes/Tasks/taskRoutes');
const sendEmailRouter = require('./sendEmail.js');
require('dotenv').config({ path: '../.env' });
const port = process.env.RDS_PORT;

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
app.use('/sendEmail', sendEmailRouter);

// Start the server
app.listen(port, () => {
  console.log(process.env.RDS_HOST);
  console.log(process.env.RDS_PORT);

  console.log(`Server is running on http://localhost:${port}`);
});
