const express = require('express');
const newContact = require('./newContact');
const getContact = require('./getContacts');
const deleteContact = require('./deleteContacts');
const router = express.Router();


router.use('/newContact', newContact); 
router.use('/Contacts', getContact); 
router.use('./deleteContact', deleteContact);

module.exports = router;