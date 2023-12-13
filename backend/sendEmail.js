const express = require('express');
const nodemailer = require('nodemailer');
const multer  = require('multer')

const router = express.Router();
require('dotenv').config({ path: '.././.env' });

router.post('/', (req, res) => {
  console.log("hi");
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'roycecollege@gmail.com',
      pass: process.env.SECRET_CODE,
    },
  });

  const { to, subject, text } = req.body;
  console.log();
  const mailOptions = {
    from: 'roycecollege@gmail.com',
    to,
    subject,
    text,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    } else {
      console.log('Email sent: ' + info.response);
      res.status(200).send('Email sent successfully');
    }
  });
});

module.exports = router;
