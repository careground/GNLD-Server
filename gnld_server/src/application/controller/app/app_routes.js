const express = require('express');
const router = express.Router();

//postSensor
const postSensor = require('./postSensor');
router.use('/sensor', postSensor);




module.exports = router;
