//REQUIRE NODEY STUFF
const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const routes = require('./controllers');
const helpers = require('./utils/helpers');

//REQUIRE MYSQL PACKAGES/CONNECTION ROUTES
const sequelize = require ('./config/connection');
const SequelizeStore = require('connect-session-sequelize');

//DECLARE EXPRESS AND A PORT
const app = express();
const PORT = process.env.PORT || 3001;

//SET UP HANDLEBARS W/ CUSTOM HELPERS
const hbs = exphbs.create({ helpers });

//COOKIES STUFF
const sess = {
    secret: 'SUPER secret secret secret',
    cookie: {},
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize
    })
};

app.use(session(sess));

//TELL EXPRESS TO USE TEMPLATE ENGINE
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(routes);

//CHANGE FORCE TO FALSE BEFORE DEPLOYMENT
sequelize.sync({ force: true }).then(() => {
    app.listen(PORT, () => console.log(`Now listening on ${PORT}`))
});