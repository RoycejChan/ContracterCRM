const express = require('express');
const newAccount = require('./newAccount');
const getAccounts = require('./getAccounts');
const deleteAccount = require('./deleteAccount');
const updateAccount = require('./updateAccount');
const router = express.Router();

router.use('/newAccount', newAccount); 
router.use('/accounts', getAccounts); 
router.use('/deleteAccount', deleteAccount); 
router.use('/updateAccount', updateAccount); 


module.exports = router;