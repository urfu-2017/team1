'use strict';

const passport = require('passport');
const User = require('../model/user');
const GitHubStrategy = require('passport-github').Strategy;

passport.use(new GitHubStrategy(
    {
        clientID: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
        callbackURL: `${process.env.URL}/auth/github/callback`
    },
    (async (accessToken, refreshToken, profile, cb) => {
        let user = await User.findByGithubID(profile.id);
        if (!user) {
            user = await User.create(profile.displayName, profile.photos[0].value, profile.id);
            // Иногда возникают причины делать так, но, кажется, не в нашем случае
            // user = await User.findByGithubID(profile.id);
        } else {
            await user.update({ name: profile.displayName, avatar: profile.photos[0].value });
        }
        cb(null, user);
    })
));

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    const user = await User.findByID(id);
    done(null, user);
});

module.exports = () => (req, res, next) => {
    if (req.user || req.url.startsWith('/auth') || req.url.startsWith('/static')) {
        next();
    } else {
        res.redirect('/auth');
    }
};
