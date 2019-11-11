const express = require('express');
const router = express.Router();

//postSensor
const postSensor = require('./postSensor');
router.use('/sensor', postSensor);

//getSensor
const getSensor = require('./getSensor');
router.use('/sensor', getSensor);

//deleteEmergency
const sendOK = require('./sendOK');
router.use('/sendoK', sendOK);


module.exports = router;
