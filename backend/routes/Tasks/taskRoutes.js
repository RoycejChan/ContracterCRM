const express = require('express');
const newTask = require('./newTask');
const getTasks = require('./getTasks');
const deleteTasks = require('./deleteTask');
const router = express.Router();

router.use('/newTask', newTask); 
router.use('/Tasks', getTasks); 
router.use('/deleteTask', deleteTasks); 

module.exports = router;