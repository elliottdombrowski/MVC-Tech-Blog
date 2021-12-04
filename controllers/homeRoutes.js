const router = require('express').Router();
const { User, Project, Comment } = require('../models');
const withAuth = require('../utils/auth');

//GET ROOT ROUTE, FIND ALL BLOG POSTS BY ANY USER
router.get('/', async (req, res) => {
    try {
        const postData = await Project.findAll({ 
            include: [{ all: true, nested: true }]
        });
        //MAP TO ARRAY AND FLAG FOR HANDLEBARS TO RENDER
        const posts = postData.map((post) => post.get({ plain: true }));

        //RENDER HBS HOMEPAGE COMPONENT, PASS IN FLAGGED PROJECT/BLOG DATA
        res.render('homepage', {
            posts,
            logged_in: req.session.logged_in
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

//RENDER LOGIN PAGE
router.get('/login', async (req, res) => {
    try {
        res.render('login');
    } catch (err) {
        res.status(500).json(err);
    }
});

//RENDER PROFILE PAGE IF USER IS LOGGED IN
router.get('/profile', withAuth, async (req, res) => {
    try {
        res.render('profile', {logged_in: req.session.logged_in});
    } catch (err) {
        res.status(500).json(err);
    }
});

//RENDER USER DATA PORTION OF PROFILE PAGE IF USER IS LOGGED IN
router.get('/user', withAuth, async (req, res) => {
    try {
        //GRAB USER'S SESSION DATA FROM DB, FLAG AS PLAIN, PASS TO HBS THROUGH RES.RENDER
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

//RENDER BLOG PAGE FROM NAV BAR LINK OR PROFILE LINK IF USER IS LOGGED IN
router.get('/blog', withAuth, async (req, res) => {
    try {
        res.render('project', {logged_in: req.session.logged_in});
    } catch (err) {
        res.status(500).json(err);
    }
});

//RENDER ALL POSTS FROM CURRENT USER
router.get('/posts', withAuth, async (req, res) => {
    try {
        //FIND ALL POSTS WHERE PROJECT/BLOG USER ID MATCHES SESSION ID
        const myPosts = await Project.findAll({
            where: {user_id: req.session.user_id},
            include: [{ all: true, nested: true }]
        });

        //MAP TO ARRAY, FLAG FOR HANDLEBARS, RENDER HBS COMPONENT AND PASS IN PROJECT/BLOG DATA
        const posts = myPosts.map((post) => post.get({ plain: true }));
        res.render('myposts', {
            posts,
            logged_in: req.session.logged_in
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

//RENDER COMMENTS FOR POST
router.get('/comments/:id', async  (req, res) => {
    try {
        //FIND ALL COMMENTS WHERE POST ID MATCHES POST SELECTED BY USER
        const findPost = await Project.findAll({ 
            where: {id: req.params.id},
            include: [{ all: true, nested: true }]
        });
        //MAP AND FLAG FOR HBS
        const findposts = findPost.map((findpost) => findpost.get({ plain: true }));

        //FIND ALL COMMENTS WHERE FOUND POST'S ID AND COMMENT'S FOREIGN REFERENCE ID MATCH
        const findComment = await Comment.findAll({
            where: {proj_id: req.params.id},
            include: [{ all: true, nested: true }]
        });
        //MAP AND FLAG FOR HBS
        const comments = findComment.map((comment) => comment.get({ plain: true }));

        //RENDER COMMENTS COMPONENT, PASS IN POST && COMMENT DATA
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