'use strict';

const passport = require('passport');
const apiRouter = require('./controllers/api/routes');

module.exports = app => {
    app.get('/auth/github', passport.authenticate('github'));
    app.get(
        '/auth/github/callback',
        passport.authenticate('github', { failureRedirect: '/auth' }),
        (req, res) => {
            res.redirect('/index');
        }
    );

    app.use('/api', apiRouter);
};
