const router = require('express').Router();
const { User, Project } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/post', withAuth, async (req, res) => {
    try {
        const newPost = await Project.create(req.body);
        console.log('new post made?? ' + newPost);
    } catch (err) {
        res.status(400).json(err);
    }
});

module.exports = router;