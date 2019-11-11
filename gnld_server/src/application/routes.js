var express = require('express');
var router = express.Router();

const userAuth = require('./controller/user/user_routes');
router.use('/', userAuth);

const appRoutes = require('./controller/app/app_routes');
router.use('/', appRoutes);

const webRoutes = require('./controller/web/web_routes');
router.use('/', webRoutes);

module.exports = router;