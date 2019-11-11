const express = require('express');
const router = express.Router();

//postSensor
const postSensor = require('./postSensor');
router.use('/sensor', postSensor);

//deleteEmergency
const sendOK = require('./sendOK');
router.use('/sendoK', sendOK);


module.exports = router;
