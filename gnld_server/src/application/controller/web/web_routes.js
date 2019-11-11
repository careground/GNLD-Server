const express = require('express');
const router = express.Router();

//getList
const getList = require('./getList');
router.use('/list', getList);

//getEmergency
const getEmergency = require('./getEmergency');
router.use('/emergency', getEmergency);

module.exports = router;