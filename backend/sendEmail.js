const express = require('express');
const nodemailer = require('nodemailer');
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })

const router = express.Router();
require('dotenv').config({ path: '.././.env' });

router.post('/', upload.single('file'), (req, res) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'roycecollege@gmail.com',
      pass: process.env.SECRET_CODE,
    },
  });

  const { to, subject, text, file } = req.body;
  console.log();
  const mailOptions = {
    from: 'roycecollege@gmail.com',
    to,
    subject,
    text,
    file,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    } else {
      res.status(200).send('Email sent successfully');
    }
  });
});

module.exports = router;
