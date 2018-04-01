'use strict';

const passport = require('passport');

module.exports = app => {
    app.get('/auth/github', passport.authenticate('github'));
    app.get(
        '/auth/github/callback',
        passport.authenticate('github', { failureRedirect: '/auth' }),
        (req, res) => {
            console.log(req.user);
            res.redirect('/');
        }
    );
};
