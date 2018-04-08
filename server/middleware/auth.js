'use strict';

const passport = require('passport');
const GitHubStrategy = require('passport-github').Strategy;

const User = require('../model/user');
const dbConnection = require('../db-connection');


passport.use(new GitHubStrategy(
    {
        clientID: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
        callbackURL: `${process.env.URL}/auth/github/callback`
    },
    ((accessToken, refreshToken, profile, cb) => {
        const user = User.create(profile.username, profile.id, profile._json.avatar_url);
        dbConnection.saveUser(user);
        cb(null, user);
    })
));

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {
    done(null, user);
});

module.exports = () => (req, res, next) => {
    if (req.user || req.url.startsWith('/auth')) {
        next();
    } else {
        res.redirect('/auth');
    }
};
