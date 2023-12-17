const express = require('express');
const cors = require('cors');
const contactRoutes = require('./routes/Contacts/contactRoutes');
const accountRoutes = require('./routes/Accounts/accountRoutes');
const taskRoutes = require('./routes/Tasks/taskRoutes');
const sendEmailRouter = require('./sendEmail.js');
require('dotenv').config({ path: '../.env' });
const port = 3000;

const app = express();

app.use(express.json({ extended: true }));
app.use(express.urlencoded({ extended: false }));
app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:5174", "https://contractorcrm.onrender.com"],
  })
);

app.use('/Contact', contactRoutes);
app.use('/Account', accountRoutes);
app.use('/Task', taskRoutes);
app.use('/sendEmail', sendEmailRouter);

// Start the server
app.listen(port, () => {
  console.log(`${process.env.RDS_ENDPOINT} the host`);
  console.log(`${process.env.RDS_PORT} the port`);

  console.log(`Server is running on http://localhost:${port}`);
});
