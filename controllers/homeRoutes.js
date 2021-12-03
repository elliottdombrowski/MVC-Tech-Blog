const router = require('express').Router();
const { User, Project, Comment } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
    try {
        const postData = await Project.findAll({ 
            include: [{ all: true, nested: true }]
        });

        const posts = postData.map((post) => post.get({ plain: true }));

        res.render('homepage', {
            posts,
            logged_in: req.session.logged_in
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/login', async (req, res) => {
    try {
        res.render('login');
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/profile', withAuth, async (req, res) => {
    try {
        res.render('profile', {logged_in: req.session.logged_in});
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/user', withAuth, async (req, res) => {
    try {
        const userData = await User.findByPk(req.session.user_id);
        
        const user = userData.get({ plain: true });

        res.render('user', {
            ...user,
            logged_in: req.session.logged_in
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/blog', withAuth, async (req, res) => {
    try {
        res.render('project', {logged_in: req.session.logged_in});
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/posts', withAuth, async (req, res) => {
    try {
        const myPosts = await Project.findAll({
            where: {user_id: req.session.user_id},
            include: [{ all: true, nested: true }]
        });

        const posts = myPosts.map((post) => post.get({ plain: true }));
        res.render('myposts', {
            posts,
            logged_in: req.session.logged_in
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/comments/:id', async  (req, res) => {
    try {
        console.log('trying find');
        const findPost = await Project.findAll({ 
            where: {id: req.params.id},
            include: [{ all: true, nested: true }]
        });
        const findposts = findPost.map((findpost) => findpost.get({ plain: true }));

        const findComment = await Comment.findAll({
            where: {proj_id: req.params.id},
            include: [{ all: true, nested: true }]
        });
        const comments = findComment.map((comment) => comment.get({ plain: true }));

        res.render('comments', {
            findposts,
            comments,
            proj_id: req.params.id,
            logged_in: req.session.logged_in
        });
    } catch (err) {
        res.status(500).json(err);
    }
})

module.exports = router;