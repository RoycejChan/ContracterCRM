const express = require('express');
const newAccount = require('./newAccount');
const getAccounts = require('./getAccounts');

const router = express.Router();

router.use('/newAccount', newAccount); 
router.use('/accounts', getAccounts); 

module.exports = router;