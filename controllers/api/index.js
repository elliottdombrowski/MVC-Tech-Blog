const router = require('express').Router();

const projRoutes = require('./projectRoutes');
const userRoutes = require('./userRoutes');
const commentRoutes = require('./commentRoutes');

router.use('/projects', projRoutes);
router.use('/users', userRoutes);
router.use('/comment', commentRoutes);

module.exports = router;