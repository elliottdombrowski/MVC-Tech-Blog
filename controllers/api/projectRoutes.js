const router = require('express').Router();
const { User, Project } = require('../../models');
const withAuth = require('../../utils/auth');

//BLOG POST CREATE ROUTE
router.post('/', withAuth, async (req, res) => {
    try {
        const newPost = await Project.create({
            ...req.body,
            user_id: req.session.user_id,
        });
        
    } catch (err) {
        res.status(400).json(err);
    }
});

module.exports = router;