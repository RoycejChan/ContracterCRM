const express = require('express');
const newContact = require('./newContact');
const getContact = require('./getContacts');

const router = express.Router();

router.use('/newContact', newContact); 
router.use('/Contacts', getContact); 

module.exports = router;