var express = require('express');
const router = express.Router();

const signup = require('./signup');
router.use('/signup',signup);

const signin = require('./signin');
router.use('/signin',signin);


module.exports = router;