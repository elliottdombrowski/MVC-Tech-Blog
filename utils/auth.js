const withAuth = (req, res, next) => {
    //IF USER NOT LOGGED IN, REDIRECT TO LOGIN ROUTE
    if (!req.session.logged_in) {
        res.redirect('/login');
    } else {
        //OTHERWISE, CALL NEXT() MIDDLEWARE
        next();
    }
};

module.exports = withAuth;