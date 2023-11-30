const express = require('express');
const newTask = require('./newTask');
const getTasks = require('./getTasks');

const router = express.Router();

router.use('/newTask', newTask); 
router.use('/Tasks', getTasks); 

module.exports = router;