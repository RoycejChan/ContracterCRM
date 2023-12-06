const express = require('express');
const newAccount = require('./newAccount');
const getAccounts = require('./getAccounts');
const deleteAccount = require('./deleteAccount');
const router = express.Router();

router.use('/newAccount', newAccount); 
router.use('/accounts', getAccounts); 
router.use('/deleteAccount', deleteAccount); 

module.exports = router;