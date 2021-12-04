const router = require('express').Router();

const { User, Project } = require('../../models');

//USER API HOME ROUTE. JUST FIND ALL USERS.
//TODO - FIGURE OUT IF I EVEN ENDED UP USING THIS ROUTE.
router.get('/', async (req, res) => {
    try {
        const userData = await User.findAll();

        res.status(200).json(userData);
    } catch (err) {
        res.status(500).json(err);
    }
});

//POST SIGNUP ROUTE, CREATE NEW USER W/ CURRENT SESSION CREDS
router.post('/', async (req, res) => {
    try {
        const userData = await User.create(req.body);

        req.session.save(() => {
            req.session.id = userData.id;
            req.session.logged_in = true;
            req.session.user_id = userData.id;
            req.session.user_data = JSON.stringify(userData);
            res.json({user: userData, logged_in: true, message: 'logged in'});
        });
    } catch (err) {
        res.status(400).json(err);
    }
});

// LOG IN ROUTE 
router.post('/login', async (req, res) => {
    try {
        //CHECK IF LOGIN EMAIL MATCHES A DATABASE RECORD | ELSE, RETURN
        const userData = await User.findOne({where: {email: req.body.email}});
        if (!userData) {
            res.status(400).json({message: 'Incorrect email or password'});
            return;
        }

        //CHECK IF LOGIN PASSWORD MATCHES DB RECORD | ELSE, RETURN
        const validPassword = await userData.checkPassword(req.body.password);
        if (!validPassword) {
            res.status(400).json({message: 'Incorrect email or password'});
            return;
        }

        //SAVE SESSION DATA TO SEQUELIZE STORE
        req.session.save(() => {
            req.session.id = userData.id;
            req.session.logged_in = true;
            req.session.user_id = userData.id;
            req.session.user_data = JSON.stringify(userData);
            res.json({user: userData, logged_in: true, message: 'logged in'});
        });
    } catch (err) {
        res.status(400).json(err);
    }
});

//LOGOUT ROUTE
router.get('/logout', (req, res) => {
    if (req.session.logged_in) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else if (err) {
        alert(err);
        res.status(404).end();
    }
});

module.exports = router;