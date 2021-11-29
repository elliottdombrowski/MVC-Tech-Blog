const router = require('express').Router();

const e = require('express');
const { User, Project } = require('../../models');
const { sequelize } = require('../../models/Project');

router.get('/', async (req, res) => {
    try {
        console.log('fuckin please');
        const userData = await User.findAll();

        res.status(200).json(userData);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.post('/', async (req, res) => {
    console.log('hitting route');
    try {
        console.log('hitting try/catch'); 
        const userData = await User.create(req.body);

        req.session.save(() => {
            req.session.id = userData.id;
            req.session.logged_in = true;
            res.status(200).json(userData);
        });
    } catch (err) {
        res.status(400).json(err);
    }
});

// LOG IN ROUTE 
router.post('/login', async (req, res) => {
    try {
        const userData = await User.findOne({where: {email: req.body.email}});

        if (!userData) {
            res.status(400).json({message: 'Incorrect email or password'});
            return;
        }

        const validPassword = await userData.checkPassword(req.body.password);

        if (!validPassword) {
            res.status(400).json({message: 'Incorrect email or password'});
            return;
        }

        req.session.save(() => {
            req.session.id = userData.id;
            req.session.logged_in = true;
            req.session.user_data = JSON.stringify(userData);
            res.json({user: userData, logged_in: true, message: 'logged in'});
        });
    } catch (err) {
        res.status(400).json(err);
    }
});

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