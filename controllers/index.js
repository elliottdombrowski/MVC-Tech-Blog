//ROUTES CONTROLLER
const router = require('express').Router();

const apiRoutes = require('./api');
const homeRoutes = require('./homeRoutes');

//USE HOMEROUTES AS ROOT ROUTE, APIROUTES AS /API
router.use('/', homeRoutes);
router.use('/api', apiRoutes);

module.exports = router;