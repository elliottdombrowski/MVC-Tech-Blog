const router = require('express').Router();

const projRoutes = require('./projectRoutes');
const userRoutes = require('./userRoutes');

router.use('/projects', projRoutes);
router.use('/users', userRoutes);

module.exports = router;