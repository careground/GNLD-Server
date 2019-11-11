const express = require('express');
const router = express.Router();

//getList
const getList = require('./getList');
router.use('/list', getList);

//getEmergency
const getEmergency = require('./getEmergency');
router.use('/emergency', getEmergency);

//deleteEmergency
const deleteEmergency = require('./deleteEmergency');
router.use('/emergency', deleteEmergency);

module.exports = router;