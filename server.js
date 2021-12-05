//REQUIRE NODEY STUFF
const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const routes = require('./controllers');
const helpers = require('./utils/helpers');

//REQUIRE MYSQL PACKAGES/CONNECTION ROUTES
const sequelize = require ('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

//DECLARE EXPRESS AND A PORT
const app = express();
const PORT = process.env.PORT || 3001;

//SET UP HANDLEBARS W/ CUSTOM HELPERS
const hbs = exphbs.create({ helpers });

// COOKIES STUFF
const oneHr = 1000 * 60 * 60 * 1;
const sess = {
    secret: 'SUPER secret secret secret',
    //SET COOKIES TO EXPIRE AFTER 1 HOUR
    cookie: { maxAge: oneHr },
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

sequelize.sync({ force: true }).then(() => {
    app.listen(PORT, () => console.log(`Now listening on ${PORT}`))
}).catch (err => {
    console.log(err);
});