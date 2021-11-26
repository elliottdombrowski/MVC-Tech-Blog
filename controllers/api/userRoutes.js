const router = require('express').Router();

const { User, Project } = require('../../models');
const { sequelize } = require('../../models/Project');

router.get('/', async (req, res) => {
    try {
        const userData = await User.findAll();

        res.status(200).json(userData);
    } catch (err) {
        res.status(500).json(err);
    }
});

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

module.exports = router;